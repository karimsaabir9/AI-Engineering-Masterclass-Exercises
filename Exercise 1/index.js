import OpenAI from "openai";
import dotenv from "dotenv";
import readlineSync from "readline-sync";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 1. Generate Outline (Streaming)
async function generateOutline(topic) {
  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    messages: [
      {
        role: "user",
        content: `Create a simple blog outline about ${topic} (max 5 points).`,
      },
    ],
  });

  let outline = "";

  for await (const chunk of stream) {
    const text = chunk.choices[0]?.delta?.content || "";
    process.stdout.write(text);
    outline += text;
  }

  return outline;
}

// 2. Summarize Outline (2 sentences)
async function summarizeOutline(outline) {
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `Summarize this in 2 sentences:\n\n${outline}`,
      },
    ],
    max_completion_tokens: 100,
  });

  return res.choices[0].message.content;
}

// 3. Answer Questions
async function answerQuestion(topic, outline, question) {
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `
Topic: ${topic}

Outline:
${outline}

Question: ${question}
        `,
      },
    ],
    max_completion_tokens: 200,
  });

  return res.choices[0].message.content;
}

// Main App
async function main() {
  console.log("Smart Content Assistant\n");

  const topic = readlineSync.question("Enter a topic: ");

  console.log("\nGenerating outline...\n");

  const outline = await generateOutline(topic);


  const summary = await summarizeOutline(outline);

  console.log("\nSUMMARY:\n");
  console.log(summary);

  while (true) {
    const question = readlineSync.question(
      "\nAsk a question (or type exit): "
    );

    if (question.toLowerCase() === "exit") break;

    const answer = await answerQuestion(topic, outline, question);

    console.log("\nAnswer:");
    console.log(answer);
  }

  console.log("\nDone!");
}

main();