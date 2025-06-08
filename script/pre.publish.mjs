import fs from "fs";
import { execSync } from "child_process";

const libraries = [
  {
    name: "@skynoveau-ui/core",
    basePath: "package/react/core",
    versionCheck: true,
  },
  {
    name: "@skynoveau-ui/utils",
    basePath: "package/react/utils",
    versionCheck: true,
  },
  {
    name: "playground",
    basePath: "playground",
    versionCheck: false,
  },
];

// Files to check for changes inside each library
const filesToCheck = [
  "src",
  "package.json",
  "eslint.config.js",
  "tsconfig.json",
  "vite.config.js",
  "readme.md",
];

// Helper to compare semantic versions
function isVersionGreater(local, remote) {
  const parse = (v) => v.replace(/^v/, "").split(".").map(Number);
  const [lMajor, lMinor, lPatch] = parse(local);
  const [rMajor, rMinor, rPatch] = parse(remote);
  if (lMajor > rMajor) return true;
  if (lMajor === rMajor && lMinor > rMinor) return true;
  if (lMajor === rMajor && lMinor === rMinor && lPatch > rPatch) return true;
  return false;
}

let failed = false;

for (const { name, basePath, versionCheck } of libraries) {
  if (!versionCheck) continue;

  try {
    // Check all specified files for changes inside this library's basePath
    let hasChanges = false;
    let changedFilesList = "";

    for (const file of filesToCheck) {
      const checkPath = `${basePath}/${file}`;
      try {
        // Ignore untracked files with --untracked-files=no
        const output = execSync(
          `git status --porcelain --untracked-files=no ${checkPath}`,
          {
            encoding: "utf-8",
          }
        ).trim();
        if (output) {
          hasChanges = true;
          output.split("\n").forEach((line) => {
            changedFilesList += `   --  ${line.trim()}\n`;
          });
        }
      } catch {
        // File/folder might not exist, silently ignore
      }
    }

    if (!hasChanges) {
      // No relevant file changes detected, allow push for this package
      continue;
    }

    // Read local package.json version
    const localPkg = JSON.parse(
      fs.readFileSync(`${basePath}/package.json`, "utf-8")
    );
    const localVersion = localPkg.version;

    // Get published version from npm
    let publishedVersion = "0.0.0";
    try {
      publishedVersion = execSync(`npm view ${name} version`, {
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "ignore"],
      }).trim();
    } catch {
      console.warn(`⚠️ ${name} not found on npm, skipping version comparison.`);
      continue;
    }

    // If local version is NOT greater than published, block push
    if (!isVersionGreater(localVersion, publishedVersion)) {
      console.error(`\nPackage : ${name}`);
      console.error(`File changes :\n${changedFilesList.trimEnd()}`);
      console.error(`Local version : ${localVersion}`);
      console.error(`Published version : ${publishedVersion}`);
      console.error(`❌ Version not updated\n`);
      failed = true;
    }
  } catch (err) {
    console.error(`⚠️ Error checking ${name}: ${err.message}`);
    failed = true;
  }
}

if (failed) {
  console.error("🚫 Fix the issues above before pushing.");
  process.exit(1);
}

// If we reach here, all checks passed
process.exit(0);
