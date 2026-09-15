import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { aj } from "@/lib/arcjet";
import { auth, currentUser } from "@clerk/nextjs/server";


export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PROMPT = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time.

Only ask questions about the following details in order, and wait for the user's answer before asking the next:
1. Starting location (source)
2. Destination city or country
3. Group size (Solo, Couple, Family, Friends)
4. Budget (Low, Medium, High)
5. Trip duration (number of days)
6. Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation)
7. Special requirements or preferences (if any)

Do not ask multiple questions at once, and never ask irrelevant questions. If any answer is missing or unclear, politely ask the user to clarify before proceeding. Always maintain a conversational, interactive style while asking questions.

Important: Never repeat a question that has already been answered and confirmed. If the user provides multiple details in a single message (e.g. "Kampala to Mogadishu, 3 Days" answers source, destination, AND trip duration at once), treat all of them as answered immediately and do not ask about any of them again. Track the user's collected answers/state throughout the conversation. After an answer is received, move directly to the next unanswered question. Do not reset the conversation state or start the question sequence from the beginning.

Along with the response, also send which UI component should be displayed for the Generative UI, for example:

budget / groupSize / tripDuration / final

The "ui" value must always match the question you are actually asking in "resp" right now — never the previous question, even if that question was answered in an earlier turn instead of the expected order. For example, once trip duration has been answered, never send ui:'tripDuration' again, even when the current question is about something else. Use "none" as the ui value when the current question has no matching generative UI component (source, destination, interests, requirements).

Where final means the AI is generating the complete final trip output.

Once all required information is collected, generate and return a strict JSON response only, with no explanations or extra text, using this schema:
{
resp:'Text Resp',
ui:'budget/groupSize/tripDuration/none/final'
}
`;

const FINAL_PROMPT = `Generate Travel Plan with give details, give me Hotels options list with HotelName,
Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and  suggest itinerary with placeName, Place Details, Place Image Url,
 Geo Coordinates,Place address, ticket Pricing, Time travel each of the location , with each day plan with best time to visit in JSON format.

Important: Prefer real, well-known, easily-recognizable hotels and points of interest (major chains, landmark hotels, famous attractions) over obscure or invented names, whenever suitable options exist for the destination. Real, famous places are far more likely to have publicly available photos, so favor them over generic or fictional-sounding names when choosing what to recommend.

 Output Schema:
 {
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "budget": "string",
    "group_size": "string",
    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string",
        "hotel_image_url": "string",
        "geo_coordinates": {
          "latitude": "number",
          "longitude": "number"
        },
        "rating": "number",
        "description": "string"
      }
    ],
    "itinerary": [
      {
        "day": "number",
        "day_plan": "string",
        "best_time_to_visit_day": "string",
        "activities": [
          {
            "place_name": "string",
            "place_details": "string",
            "place_image_url": "string",
            "geo_coordinates": {
              "latitude": "number",
              "longitude": "number"
            },
            "place_address": "string",
            "ticket_pricing": "string",
            "time_travel_each_location": "string",
            "best_time_to_visit": "string"
          }
        ]
      }
    ]
  }
}

`;

export async function POST(req: NextRequest) {
  const { messages, isFinal, answeredFields } = await req.json();
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const {has} = await auth();
  const hasPremiumAccess = has({ plan: 'monthly' })
  console.log('hasPremiumAccess', hasPremiumAccess)
  const decision = await aj.protect(req, {
    userId: user?.primaryEmailAddress?.emailAddress ?? "",
    requested: isFinal ? 5 : 0,
  }); // Deduct 5 tokens from the bucket

  if (decision.isDenied() && !hasPremiumAccess) {
    return NextResponse.json({
      resp: "NO Free Credit Remaining",
      ui: "limit",
    });
  }

  const answeredNote =
    !isFinal && answeredFields?.length
      ? `\n\nThe user has ALREADY confirmed the following details in this conversation: ${answeredFields.join(", ")}. Do NOT ask about these again under any circumstances, even in rephrased form. Skip directly to asking about the next unanswered item in the list.`
      : "";
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5.4-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: (isFinal ? FINAL_PROMPT : PROMPT) + answeredNote,
        },
        ...messages,
      ],
    });
    console.log(completion.choices[0].message);
    const message = completion.choices[0].message;
    return NextResponse.json(JSON.parse(message.content ?? ""));
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Something went wrong" });
  }
}
