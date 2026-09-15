import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const USER_AGENT =
  "AiTripPlanner/1.0 (https://github.com/karimsaabir9/AI-Trip-Planner)";
const STOPWORDS = new Set([
  "the",
  "hotel",
  "and",
  "of",
  "a",
  "an",
  "inn",
  "resort",
  "in",
]);
const wikiHeaders = { "User-Agent": USER_AGENT };

function significantWords(text: string): string[] {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
}

function overlapCount(a: string, b: string): number {
  const wordsB = new Set(significantWords(b));
  return significantWords(a).filter((w) => wordsB.has(w)).length;
}

async function searchPexelsImage(query: string): Promise<string | null> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey || !query.trim()) return null;
  try {
    const result = await axios.get("https://api.pexels.com/v1/search", {
      headers: { Authorization: apiKey },
      params: { query, per_page: 1 },
    });
    const photo = result?.data?.photos?.[0];
    return photo?.src?.landscape || photo?.src?.large || photo?.src?.medium || null;
  } catch {
    return null;
  }
}

async function searchWikipediaImage(
  query: string,
  opts: { requireGeographic?: boolean } = {},
): Promise<{
  imageUrl: string;
  title: string;
  extract: string;
} | null> {
  if (!query.trim()) return null;
  const searchResult = await axios.get("https://en.wikipedia.org/w/api.php", {
    headers: wikiHeaders,
    params: {
      action: "query",
      list: "search",
      srsearch: query,
      srlimit: 1,
      format: "json",
    },
  });

  const hit = searchResult?.data?.query?.search?.[0];
  if (!hit?.title || overlapCount(query, hit.title) < 1) {
    return null;
  }

  const summaryResult = await axios.get(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(hit.title)}`,
    { headers: wikiHeaders },
  );

  const summary = summaryResult?.data;
  const imageUrl = summary?.thumbnail?.source || summary?.originalimage?.source;
  // Only Wikimedia Commons media is freely licensed for reuse. Files under
  // /wikipedia/<langcode>/ (e.g. /wikipedia/en/) are local non-free/fair-use
  // uploads (logos, cover art) that Wikipedia itself isn't licensed to let
  // third parties redistribute, so they must be excluded here.
  if (!imageUrl || !imageUrl.includes("/wikipedia/commons/")) return null;

  // Real places have coordinates; this rules out unrelated topics (books,
  // people, fictional settings, etc.) that happen to share the search term.
  if (opts.requireGeographic && !summary?.coordinates) return null;

  return { imageUrl, title: hit.title, extract: summary?.extract || "" };
}

async function searchWikipediaExact(
  hotelName: string,
  addressParts: string[],
): Promise<string | null> {
  const exact = await searchWikipediaImage(hotelName);
  if (!exact) return null;
  const extractLower = exact.extract.toLowerCase();
  const locationMatch =
    addressParts.length === 0 ||
    addressParts.some((part) => extractLower.includes(part.toLowerCase()));
  return locationMatch ? exact.imageUrl : null;
}

async function searchWikipediaLocation(addressParts: string[]): Promise<string | null> {
  const candidates = Array.from(
    new Set(
      [addressParts[addressParts.length - 2], addressParts[addressParts.length - 1]].filter(
        Boolean,
      ),
    ),
  );
  for (const candidate of candidates) {
    const fallback = await searchWikipediaImage(candidate, { requireGeographic: true });
    if (fallback) return fallback.imageUrl;
  }
  return null;
}

const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const imageCache = new Map<string, { imageUrl: string | null; expiresAt: number }>();

export async function POST(req: NextRequest) {
  const { hotelName, location } = await req.json();
  if (!hotelName) {
    return NextResponse.json({ error: "hotelName is required" });
  }

  const cacheKey = `${hotelName}|${location || ""}`.toLowerCase();
  const cached = imageCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.imageUrl
      ? NextResponse.json(cached.imageUrl)
      : NextResponse.json({ error: "No photo available" });
  }

  const addressParts: string[] = (location || "")
    .split(",")
    .map((s: string) => s.trim())
    .filter((s: string) => s.length > 2 && !/^\d+$/.test(s) && !/\d{3,}/.test(s));
  const city = addressParts[addressParts.length - 2] || addressParts[addressParts.length - 1] || "";

  const setCache = (imageUrl: string | null) =>
    imageCache.set(cacheKey, { imageUrl, expiresAt: Date.now() + CACHE_TTL_MS });

  try {
    // 1. Pexels — specific hotel/place name + location.
    let imageUrl = await searchPexelsImage(`${hotelName} ${location || ""}`.trim());

    // 2. Wikimedia — specific hotel/place, validated against its location.
    if (!imageUrl) imageUrl = await searchWikipediaExact(hotelName, addressParts);

    // 3. Pexels again — broader query (name + city only).
    if (!imageUrl) imageUrl = await searchPexelsImage(`${hotelName} ${city}`.trim());

    // 4. Wikimedia again — broader query (the city/country itself).
    if (!imageUrl) imageUrl = await searchWikipediaLocation(addressParts);

    // 5. Pexels — broadest possible query (just the city), to guarantee a
    // real, relevant image is always found before ever considering a
    // placeholder.
    if (!imageUrl && city) imageUrl = await searchPexelsImage(city);

    setCache(imageUrl);
    return imageUrl
      ? NextResponse.json(imageUrl)
      : NextResponse.json({ error: "No photo available" });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Something went wrong" });
  }
}
