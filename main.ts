import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-word verdict on an ex: the relationship as a subscription
// service you finally cancelled. No more renewals, no more spam.
const word = "Unsubscribed";

if (!/^\S+$/.test(word)) {
  throw new Error("word must contain no whitespace");
}
if (word.length < 1 || word.length > 111) {
  throw new Error("word must be 1-111 characters long");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), word, "utf8");
