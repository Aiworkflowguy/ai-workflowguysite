// ============================================================================
//  AI IMAGE GENERATION — "Nano Banana" (Google Gemini image model).
//
//  Generates the site's branded imagery into public/images/ from the prompt
//  manifest below. Prompts follow the 5-part formula (subject · style ·
//  composition · lighting/color · details) and lock the brand palette:
//  near-black #0A0B0D canvas + neon-lime #C7F94B accent, cinematic + minimal,
//  with negative space for text overlays. No text baked into images (models are
//  unreliable at text — real copy is overlaid in HTML).
//
//  Usage:
//    1. Put GEMINI_API_KEY=... in aiworkflowguy-site/.env  (free key:
//       https://aistudio.google.com/apikey)
//    2. npm run images            # generates only missing images
//       npm run images -- --force # regenerate everything
//       npm run images -- dental  # only names matching "dental"
//
//  Billed by Google, separate from Claude/Anthropic. Iterate deliberately.
// ============================================================================
import { GoogleGenAI } from '@google/genai';
import sharp from 'sharp';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'public', 'images');
const MODEL = 'gemini-2.5-flash-image'; // "Nano Banana". If it 404s, run client.models.list().

// Shared brand style appended to every prompt so the set stays cohesive.
const BRAND =
  'cinematic, moody, minimal, high-end; near-black #0A0B0D background, ' +
  'single neon-lime #C7F94B accent light, deep shadows, subtle film grain, ' +
  'shallow depth of field; generous empty negative space for text overlay; ' +
  '16:9 wide aspect ratio; photorealistic; no text, no words, no logos, no watermark, no people looking at camera.';

// Each entry → public/images/<name>.png
const IMAGES = [
  {
    name: 'industry-dental',
    prompt:
      'The empty front desk and waiting area of a sleek modern dental practice, clean and calm, a phone on the reception counter, ' +
      'wide establishing interior shot, subject weighted to the right third. ' + BRAND,
  },
  {
    name: 'industry-hvac',
    prompt:
      'An HVAC / home-service work van and tidy tools at dusk outside a suburban home, condenser unit in soft focus, ' +
      'wide cinematic exterior shot, subject weighted to the right third. ' + BRAND,
  },
  {
    name: 'industry-gyms',
    prompt:
      'The interior of a premium boutique fitness studio at night, empty, dumbbell rack and a squat rack, polished floor reflections, ' +
      'wide interior shot, subject weighted to the right third. ' + BRAND,
  },
  {
    name: 'industry-med-spas',
    prompt:
      'An elegant, serene med-spa treatment room, empty, a modern treatment chair and soft towels, spa-clean surfaces, ' +
      'wide interior shot, subject weighted to the right third. ' + BRAND,
  },
  {
    name: 'industry-salons',
    prompt:
      'The interior of a stylish modern salon / barbershop at night, empty styling chairs facing mirrors with warm bulb lighting, ' +
      'wide interior shot, subject weighted to the right third. ' + BRAND,
  },
  {
    name: 'hero-abstract',
    prompt:
      'An abstract 3D visualization of a glowing voice waveform flowing to the right and resolving into the grid of a calendar / booking, ' +
      'representing a phone call turning into a booked appointment; sleek dark futuristic render, centered with wide margins. ' + BRAND,
  },
];

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('\n✗ GEMINI_API_KEY not set. Add it to aiworkflowguy-site/.env');
    console.error('  Get a free key: https://aistudio.google.com/apikey\n');
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const force = args.includes('--force');
  const filters = args.filter((a) => !a.startsWith('--'));
  const wanted = IMAGES.filter((i) => !filters.length || filters.some((f) => i.name.includes(f)));

  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
  const ai = new GoogleGenAI({ apiKey });

  let made = 0, skipped = 0, failed = 0;
  for (const img of wanted) {
    const outPath = join(OUT_DIR, `${img.name}.webp`);
    if (existsSync(outPath) && !force) {
      console.log(`• skip  ${img.name} (exists — use --force to regenerate)`);
      skipped++;
      continue;
    }
    process.stdout.write(`… gen   ${img.name} `);
    try {
      const resp = await ai.models.generateContent({ model: MODEL, contents: img.prompt });
      const cand = resp.candidates?.[0];
      if (cand?.finishReason && cand.finishReason !== 'STOP') {
        console.log(`✗ blocked (${cand.finishReason})`);
        failed++;
        continue;
      }
      const part = cand?.content?.parts?.find((p) => p.inlineData?.data);
      if (!part) {
        console.log('✗ no image in response');
        failed++;
        continue;
      }
      // Convert to WebP (photos: ~1.5MB PNG → ~50KB WebP) so the site stays fast.
      await sharp(Buffer.from(part.inlineData.data, 'base64')).webp({ quality: 82 }).toFile(outPath);
      console.log(`✓ → public/images/${img.name}.webp`);
      made++;
    } catch (err) {
      console.log(`✗ ${err?.message ?? err}`);
      failed++;
    }
  }
  console.log(`\nDone. ${made} generated, ${skipped} skipped, ${failed} failed.`);
  if (made) console.log('Saved as optimized WebP. Rebuild (npm run build) — the images auto-appear where wired.');
}

main();
