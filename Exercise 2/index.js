import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// user input
const theme = process.argv.slice(2).join(" ");

if (!theme) {
  console.log('Usage: node index.js "anime style character"');
  process.exit(1);
}

// folders
if (!fs.existsSync("images")) fs.mkdirSync("images");
if (!fs.existsSync("gallery")) fs.mkdirSync("gallery");

// model gpt-image-1
const model = "gpt-image-1";

// sizes only
const sizes = [
  "1024x1024", // square
  "1536x1024", // landscape
  "1024x1536", // portrait
];

const metadata = [];

// generate image
async function generate(size) {
  console.log(`Generating: ${size}`);

  const result = await openai.images.generate({
    model,
    prompt: theme,
    size,
  });

  const buffer = Buffer.from(result.data[0].b64_json, "base64");

  const file = `images/${model}_${size}_${Date.now()}.png`;

  fs.writeFileSync(file, buffer);

  metadata.push({
    model,
    theme,
    size,
    file,
  });

  console.log("Saved:", file);
}

// run all sizes
for (const size of sizes) {
  await generate(size);
}

// save metadata
fs.writeFileSync("images/metadata.json", JSON.stringify(metadata, null, 2));

// create gallery
createGallery(metadata);

console.log("DONE ✔");

function createGallery(images) {
  const cards = images
    .map(
      (img) => `
      <div class="card">
        <img src="../${img.file}" />
        <div class="info">
          <p><b>Size:</b> ${img.size}</p>
        </div>
      </div>
    `,
    )
    .join("");

  const html = `
<!DOCTYPE html>
<html>
<head>
<title>Image Gallery</title>
<style>
body { font-family: Arial; background:#111; color:white; }
h1 { text-align:center; }
.grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:15px; padding:20px; }
.card { background:#222; padding:10px; border-radius:10px; }
img { width:100%; border-radius:10px; }
</style>
</head>

<body>

<h1>${theme}</h1>

<div class="grid">
${cards}
</div>

</body>
</html>
`;

  fs.writeFileSync("gallery/index.html", html);
}
