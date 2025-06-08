import fs from "fs";

import { execSync } from "child_process";

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
    // Added --untracked-files=no to ignore untracked files like '??'
    const srcChanges = execSync(
      `git status --porcelain --untracked-files=no ${srcPath}`,
      {
        encoding: "utf-8",
      }
    ).trim();
    const pkgChanges = execSync(
      `git status --porcelain --untracked-files=no ${pkgPath}`,
      {
        encoding: "utf-8",
      }
    ).trim();

    const hasChanges = !!(srcChanges || pkgChanges);
    if (!hasChanges) continue;

    // Format changed files list
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
      console.warn(`⚠️ ${name} not found on npm, skipping version comparison.`);
      continue;
    }

    if (!isVersionGreater(localVersion, publishedVersion)) {
      console.error(`\nPackage : ${name}`);
      console.error(`File changes :  \n${changedFilesList.trimEnd()}`);
      console.error(`Local version : ${localVersion}`);
      console.error(`Published : ${publishedVersion}`);
      console.error(`❌ Need to updated package version\n`);
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
