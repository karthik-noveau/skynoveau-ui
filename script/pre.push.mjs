import fs from "fs";
import { execSync } from "child_process";

// Move to the root of the repo
const repoRoot = execSync("git rev-parse --show-toplevel", {
  encoding: "utf-8",
}).trim();
process.chdir(repoRoot);
console.log(`🔍 Running pre-push check from repo root: ${repoRoot}\n`);

const libraries = [
  {
    name: "@skynoveau-ui/core",
    pkgPath: "package/react/core/package.json",
    versionCheck: true,
  },
  {
    name: "@skynoveau-ui/utils",
    pkgPath: "package/react/utils/package.json",
    versionCheck: true,
  },
  {
    name: "playground",
    pkgPath: "playground/package.json",
    versionCheck: false, // ✅ no version check, but still checks for file paths
  },
];

// Compare semantic versions
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

for (const { name, pkgPath, versionCheck } of libraries) {
  try {
    console.log(`📦 Checking: ${name}`);

    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

    // ✅ 1. Always check for file: dependencies
    const allDeps = {
      ...pkg.dependencies,
      ...pkg.devDependencies,
      ...pkg.peerDependencies,
      ...pkg.optionalDependencies,
    };

    const fileDeps = Object.entries(allDeps).filter(
      ([, val]) => typeof val === "string" && val.startsWith("file:")
    );

    if (fileDeps.length > 0) {
      console.error(`\n❌ Found local path dependencies: ${name}`);
      fileDeps.forEach(([dep, path]) => {
        console.error(`   - ${dep}: ${path}`);
      });
      failed = true;
    } else {
      console.log("✅ No file-based dependencies found.");
    }

    // ✅ 2. Check version if enabled
    if (versionCheck) {
      // Detect local changes in the package folder
      const folderPath = pkgPath.replace(/\/package\.json$/, "");
      const changes = execSync(`git status --porcelain ${folderPath}`, {
        encoding: "utf-8",
      }).trim();

      if (!changes) {
        console.log("✅ No local changes found.\n");
        continue;
      }

      // Check version bump
      const localVersion = pkg.version;

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
        console.error(`❌ Version mismatch : ${name}`);
        console.error(`Local version:     ${localVersion}`);
        console.error(`Published version: ${publishedVersion}\n`);
        failed = true;
      } else {
        console.log("✅ Version is greater than published.\n");
      }
    } else {
      console.log("ℹ️  Version check skipped.\n");
    }
  } catch (err) {
    console.error(`⚠️  Error checking ${name}: ${err.message}`);
    failed = true;
  }
}

if (failed) {
  console.error(
    "\nPre-push checks failed. Fix the issues above before pushing."
  );
  process.exit(1);
} else {
  console.log("✅ All pre-push checks passed.\n");
}
