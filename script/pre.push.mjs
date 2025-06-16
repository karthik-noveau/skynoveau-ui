import fs from "fs";
import { execSync } from "child_process";

// Ensure we're in the root of the Git repo
const repoRoot = execSync("git rev-parse --show-toplevel", {
  encoding: "utf-8",
}).trim();
process.chdir(repoRoot);
console.log(`🔍 Running pre-push check from repo root: ${repoRoot}\n`);

const libraries = [
  {
    name: "@skynoveau-ui/core",
    srcPath: "package/react/core/src",
    pkgPath: "package/react/core/package.json",
    versionCheck: true,
  },
  {
    name: "@skynoveau-ui/utils",
    srcPath: "package/react/utils/src",
    pkgPath: "package/react/utils/package.json",
    versionCheck: true,
  },
  {
    name: "playground",
    srcPath: "playground/src",
    pkgPath: "playground/package.json",
    versionCheck: false,
  },
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

for (const { name, srcPath, pkgPath, versionCheck } of libraries) {
  if (!versionCheck) continue;

  try {
    console.log(`📦 Checking: ${name}`);

    const srcChanges = execSync(
      `git status --porcelain --untracked-files=no ${srcPath}`,
      { encoding: "utf-8" }
    ).trim();

    const pkgChanges = execSync(
      `git status --porcelain --untracked-files=no ${pkgPath}`,
      { encoding: "utf-8" }
    ).trim();

    const hasChanges = !!(srcChanges || pkgChanges);
    if (!hasChanges) {
      console.log("✅ No changes detected.\n");
      continue;
    }

    // Format list of changed files
    let changedFilesList = "";
    if (srcChanges) {
      srcChanges.split("\n").forEach((line) => {
        changedFilesList += `   --  ${line.trim()}\n`;
      });
    }
    if (pkgChanges) {
      pkgChanges.split("\n").forEach((line) => {
        changedFilesList += `   --  ${line.trim()}\n`;
      });
    }

    const localPkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    const localVersion = localPkg.version;

    let publishedVersion = "0.0.0";
    try {
      publishedVersion = execSync(`npm view ${name} version`, {
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "ignore"],
      }).trim();
    } catch {
      console.warn(
        `⚠️  ${name} not found on npm, skipping version comparison.`
      );
      continue;
    }

    if (!isVersionGreater(localVersion, publishedVersion)) {
      console.error(`\n🚫 Package: ${name}`);
      console.error(`Changed files:\n${changedFilesList.trimEnd()}`);
      console.error(`Local version:     ${localVersion}`);
      console.error(`Published version: ${publishedVersion}`);
      console.error(`❌ Please update the version in package.json\n`);
      failed = true;
    } else {
      console.log("✅ Version is greater than published.\n");
    }
  } catch (err) {
    console.error(`⚠️  Error checking ${name}: ${err.message}`);
    failed = true;
  }
}

if (failed) {
  console.error(
    "\n🚫 Pre-push checks failed. Fix the issues above before pushing."
  );
  process.exit(1);
} else {
  console.log("✅ All pre-push checks passed.\n");
}
