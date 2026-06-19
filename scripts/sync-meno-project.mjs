import { cp, mkdir, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "..");
const menoRoot =
  process.env.MENO_PROJECT_PATH ??
  "/Users/maciejpostek/Documents/Meno/local/mpcom-marketing-astro";
const mode = process.argv[2];

const directories = [
  "src/components",
  "src/pages",
  "src/styles",
  "src/types",
  "public/fonts",
  "public/images"
];

const files = [
  "AGENTS.md",
  "MENO.md",
  "README.md",
  "astro.config.mjs",
  "colors.json",
  "enums.json",
  "package-lock.json",
  "package.json",
  "project.config.json",
  "tsconfig.json",
  "variables.json"
];

async function exists(target) {
  try {
    await stat(target);
    return true;
  } catch {
    return false;
  }
}

async function removeConflictCopies(directory) {
  if (!await exists(directory)) {
    return;
  }

  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const target = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await removeConflictCopies(target);
    } else if (/ \d+\.astro$/u.test(entry.name)) {
      await rm(target);
      console.log(`Removed Meno conflict copy: ${target}`);
    }
  }
}

async function copyDirectory(sourceRoot, destinationRoot, relativeDirectory) {
  const source = path.join(sourceRoot, relativeDirectory);
  const destination = path.join(destinationRoot, relativeDirectory);

  if (!await exists(source)) {
    return;
  }

  await rm(destination, { recursive: true, force: true });
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(source, destination, { recursive: true });
}

async function copyFile(sourceRoot, destinationRoot, relativeFile) {
  const source = path.join(sourceRoot, relativeFile);
  const destination = path.join(destinationRoot, relativeFile);

  if (!await exists(source)) {
    return;
  }

  await mkdir(path.dirname(destination), { recursive: true });
  await cp(source, destination);
}

async function sync(sourceRoot, destinationRoot) {
  for (const directory of directories) {
    await copyDirectory(sourceRoot, destinationRoot, directory);
  }

  for (const file of files) {
    await copyFile(sourceRoot, destinationRoot, file);
  }

  await removeConflictCopies(path.join(destinationRoot, "src"));
}

if (mode === "to-meno") {
  await sync(repositoryRoot, menoRoot);
  console.log(`Synced canonical repository to Meno: ${menoRoot}`);
} else if (mode === "from-meno") {
  await removeConflictCopies(path.join(menoRoot, "src"));
  await sync(menoRoot, repositoryRoot);
  console.log(`Exported Meno changes to canonical repository: ${repositoryRoot}`);
} else {
  console.error("Usage: node scripts/sync-meno-project.mjs <to-meno|from-meno>");
  process.exit(1);
}
