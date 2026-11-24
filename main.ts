// 3 AM Hotfix — make.fun entry.
// Writes a single git commit message line to entry.txt in the output
// directory the harness provides. Deterministic: same bytes every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line: a terse imperative commit message from a dev who has just
// fixed production at 3 AM. The auth lockout escalates — every user,
// then the dev, then the CEO — so the punchline lands on the last word.
const LINE = "fix(auth): locked out all users, then myself, then the CEO";

// Resolve the output directory the way the harness expects: the
// MAKEFUN_OUTPUT_DIR environment variable first, then a --output flag,
// then the sandbox default /output.
function outputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.trim().length > 0) return fromEnv;
  const flag = process.argv.indexOf("--output");
  if (flag >= 0 && process.argv[flag + 1]) return process.argv[flag + 1];
  return "/output";
}

const dir = outputDir();
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "entry.txt"), LINE, "utf8");
console.log(`wrote ${LINE.length} chars to ${join(dir, "entry.txt")}`);
