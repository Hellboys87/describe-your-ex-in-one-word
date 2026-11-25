import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-word verdict on an ex: the relationship as a subscription
// service you finally cancelled. No more renewals, no more spam —
// the cleanest break-up line because it frames the ex as a service
// you chose to stop paying for, not a loss you suffered.
const word = "Unsubscribed";

// A one-word entry must be a single unbroken token: letters only,
// 1-111 chars, no whitespace, no punctuation, no trailing newline.
function validateWord(value: string): void {
  if (!/^[A-Za-z]{1,111}$/.test(value)) {
    throw new Error(
      "word must be a single token of 1-111 letters, no whitespace or punctuation",
    );
  }
}

validateWord(word);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, word, "utf8");

// Round-trip check: the file must contain exactly the word, nothing else.
// A partial write or stray newline would fail the one-word requirement,
// so verify the bytes on disk before declaring success.
const written = readFileSync(outPath, "utf8");
if (written !== word) {
  throw new Error(`entry.txt mismatch: expected ${JSON.stringify(word)}, got ${JSON.stringify(written)}`);
}
