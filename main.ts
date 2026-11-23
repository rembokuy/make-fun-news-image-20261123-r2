import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = process.env.MAKEFUN_OUTPUT_DIR?.trim() || "/output";
mkdirSync(outDir, { recursive: true });
const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "entry.png");
const dest = join(outDir, "entry.png");
copyFileSync(src, dest);

// Verifikasi hasil salinan: tujuan harus ada dan ukurannya sama dengan sumber.
const srcSize = statSync(src).size;
let destSize: number;
try {
  destSize = statSync(dest).size;
} catch {
  throw new Error(`copy failed: ${dest} does not exist after copying ${src}`);
}
if (destSize !== srcSize) {
  throw new Error(
    `copy failed: size mismatch for ${dest} (expected ${srcSize} bytes, got ${destSize})`,
  );
}
console.log(`copied entry.png (${srcSize} bytes) to ${dest}`);
