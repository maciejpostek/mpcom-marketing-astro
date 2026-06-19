import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { emit, parse } from "meno-astro/dialect";

const root = process.cwd();
const failures = [];
const requiredFiles = [
  "project.config.json",
  "colors.json",
  "variables.json",
  "enums.json",
  "astro.config.mjs",
  "src/pages",
  "src/components"
];

async function exists(relativePath) {
  try {
    await access(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
}

async function readJson(relativePath) {
  try {
    return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
  } catch (error) {
    failures.push(`${relativePath}: invalid JSON (${error.message})`);
    return null;
  }
}

async function collectAstroFiles(relativeDirectory) {
  const directory = path.join(root, relativeDirectory);
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relativePath = path.join(relativeDirectory, entry.name);

    if (entry.isDirectory()) {
      files.push(...await collectAstroFiles(relativePath));
    } else if (entry.isFile() && entry.name.endsWith(".astro")) {
      files.push(relativePath);
    }
  }

  return files;
}

for (const requiredFile of requiredFiles) {
  if (!await exists(requiredFile)) {
    failures.push(`${requiredFile}: missing required Meno file or directory`);
  }
}

const projectConfig = await readJson("project.config.json");
const packageJson = await readJson("package.json");
await readJson("colors.json");
await readJson("variables.json");
await readJson("enums.json");

if (projectConfig && projectConfig.format !== "astro") {
  failures.push('project.config.json: "format" must be "astro"');
}

if (packageJson && !packageJson.dependencies?.["meno-astro"]) {
  failures.push("package.json: meno-astro must be listed in dependencies");
}

if (await exists("astro.config.mjs")) {
  const astroConfig = await readFile(path.join(root, "astro.config.mjs"), "utf8");

  if (!astroConfig.includes('meno-astro/integration') || !astroConfig.includes("meno()")) {
    failures.push("astro.config.mjs: missing the meno-astro integration");
  }
}

if (await exists("src/pages") && await exists("src/components")) {
  const astroFiles = [
    ...await collectAstroFiles("src/pages"),
    ...await collectAstroFiles("src/components")
  ];

  for (const relativePath of astroFiles) {
    try {
      const source = await readFile(path.join(root, relativePath), "utf8");
      const parsed = parse(source);
      parse(emit(parsed.model));

      if (/\bclass\s*=\s*["']/u.test(source)) {
        failures.push(`${relativePath}: raw class attribute is not round-trippable`);
      }

      if (/ \d+\.astro$/u.test(relativePath)) {
        failures.push(`${relativePath}: Meno conflict-copy filename is not allowed`);
      }
    } catch (error) {
      failures.push(`${relativePath}: Meno dialect parse failed (${error.message})`);
    }
  }

  console.log(`Checked ${astroFiles.length} Astro files with the Meno dialect parser.`);
}

if (failures.length > 0) {
  console.error("\nMeno compatibility check failed:\n");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Meno project structure and Astro dialect compatibility are valid.");
