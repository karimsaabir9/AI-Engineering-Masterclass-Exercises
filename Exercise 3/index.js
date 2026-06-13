import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//cedar 1
// const mp3 = await openai.audio.speech.create({
//   model: "gpt-4o-mini-tts",
//   voice: "cedar",
//   input: "Good morning, Sarah. How has your day been so far?",
//   instructions: "Speak like a friendly, confident young man with a natural conversational tone.",
// });

// //coral 1
// const mp3 = await openai.audio.speech.create({
//   model: "gpt-4o-mini-tts",
//   voice: "coral",
//   input:
//     "Good morning, John. It's been wonderful so far. I just finished an important project.",
//   instructions: "Speak like a warm, cheerful young woman with positive energy.",
// });

//cedar 2
// const mp3 = await openai.audio.speech.create({
//   model: "gpt-4o-mini-tts",
//   voice: "cedar",
//   input:
//     "That's fantastic. Congratulations! You must be very proud of yourself.",
//   instructions: "Sound supportive and genuinely happy for her.",
// });

// //coral 2
// const mp3 = await openai.audio.speech.create({
//   model: "gpt-4o-mini-tts",
//   voice: "coral",
//   input:
//     "Thank you. It took a lot of effort, but it was worth it. What about your day?",
//   instructions: "Sound grateful and relaxed.",
// });

//cedar 2
// const mp3 = await openai.audio.speech.create({
//   model: "gpt-4o-mini-tts",
//   voice: "cedar",
//   input: "I've been learning new AI technologies and building some interesting projects.",
//   instructions:
//     "Speak with excitement and curiosity."

// });

// //coral 3
const mp3 = await openai.audio.speech.create({
  model: "gpt-4o-mini-tts",
  voice: "coral",
  input: "That sounds amazing. I'd love to hear more about those projects sometime.",
  instructions:
    "Speak with interest and enthusiasm."

});

const buffer = Buffer.from(await mp3.arrayBuffer());
await fs.promises.writeFile("audio/coral_3.mp3", buffer);
console.log("Audio saved to : audio/coral_3.mp3");
