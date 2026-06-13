import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// TEXT GENERATION
async function generateArticle(topic) {
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `Write a detailed article about: ${topic}`,
      },
    ],
    max_completion_tokens: 500,
  });

  return res.choices[0].message.content;
}

async function generateSocialPost(topic) {
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `Write a short viral social media post about: ${topic}`,
      },
    ],
    max_completion_tokens: 120,
  });

  return res.choices[0].message.content;
}

// IMAGE GENERATION
async function generateImage(prompt, filename) {
  const result = await openai.images.generate({
    model: "gpt-image-1",
    prompt,
    size: "1024x1024",
  });

  if (!fs.existsSync("output/images")) {
    fs.mkdirSync("output/images", { recursive: true });
  }

  const buffer = Buffer.from(result.data[0].b64_json, "base64");
  const path = `output/images/${filename}.png`;

  fs.writeFileSync(path, buffer);

  return path;
}


// TEXT TO SPEECH
async function generateSpeech(text, filename) {
  const audio = await openai.audio.speech.create({
    model: "gpt-4o-mini-tts",
    voice: "nova",
    input: text,
    instructions:
      "Speak clearly, naturally, and engaging with good emotion.",
  });

  if (!fs.existsSync("output/audio")) {
    fs.mkdirSync("output/audio", { recursive: true });
  }

  const buffer = Buffer.from(await audio.arrayBuffer());
  const path = `output/audio/${filename}.mp3`;

  await fs.promises.writeFile(path, buffer);

  return path;
}

// TRANSCRIPTION
async function transcribeAudio(filePath) {
  const res = await openai.audio.transcriptions.create({
    file: fs.createReadStream(filePath),
    model: "gpt-4o-transcribe",
  });

  return res.text;
}


// ERROR WRAPPER
async function safe(fn, fallback = "FAILED") {
  try {
    return await fn();
  } catch (err) {
    console.error("Error:", err.message);
    return fallback;
  }
}


// FULL PIPELINE
async function buildContentSuite(topic) {
  console.log("🚀 Generating Content Suite for:", topic);

  const article = await safe(() => generateArticle(topic));
  const post = await safe(() => generateSocialPost(topic));

  const headerImage = await safe(() =>
    generateImage(`Blog header about ${topic}`, "header")
  );

  const thumbnail = await safe(() =>
    generateImage(`YouTube thumbnail about ${topic}`, "thumbnail")
  );

  const narration = await safe(() =>
    generateSpeech(article, "narration")
  );

  return {
    article,
    post,
    assets: {
      headerImage,
      thumbnail,
      narration,
    },
  };
}


// RUN PROJECT
const topic = "Artificial Intelligence in Education";

const result = await buildContentSuite(topic);

console.log("\n✅ DONE\n");

console.log("ARTICLE:\n", result.article);
console.log("\nPOST:\n", result.post);
console.log("\nASSETS:\n", result.assets);

