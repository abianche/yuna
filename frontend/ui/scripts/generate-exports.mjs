import { promises as fs } from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const srcDir = path.join(projectRoot, "src");
const uiDir = path.join(srcDir, "components", "ui");
const outFile = path.join(srcDir, "_generated-ui-exports.ts");

async function walk(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map(async (d) => {
      const res = path.join(dir, d.name);
      if (d.isDirectory()) return walk(res);
      return res;
    })
  );
  return files.flat();
}

function toModuleSpecifier(absPath) {
  const relFromSrc = path.relative(srcDir, absPath).replaceAll(path.sep, "/");
  const withoutExt = relFromSrc.replace(/\.(tsx?|ts)$/i, "");
  return `./${withoutExt}`;
}

const all = await walk(uiDir);
const files = all
  .filter((f) => /\.(tsx?|ts)$/i.test(f))
  .filter((f) => !/\.d\.ts$/i.test(f))
  .filter((f) => !/(\.stories|\.test|\.spec)\./i.test(f))
  .filter((f) => !/(^|\/)index\.tsx?$/i.test(f));

const header = [
  "// AUTO-GENERATED FILE. Do not edit manually.",
  "// Regenerate by running: node scripts/generate-exports.mjs",
  "",
].join("\n");

const lines = files
  .sort((a, b) => a.localeCompare(b))
  .map((f) => `export * from "${toModuleSpecifier(f)}"`);

await fs.writeFile(outFile, header + lines.join("\n") + "\n", "utf8");
console.log(
  `Generated ${path.relative(projectRoot, outFile)} with ${
    files.length
  } exports`
);
