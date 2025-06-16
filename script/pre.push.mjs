import fs from "fs";
import { execSync } from "child_process";

// Move to the root of the repo
const repoRoot = execSync("git rev-parse --show-toplevel", {
  encoding: "utf-8",
}).trim();
process.chdir(repoRoot);
console.log(`🔍 Running pre-push check from repo root: ${repoRoot}\n`);

const pathList = [
  "src",
  "eslint.config.js",
  "package.json",
  "readme.md",
  "tsconfig.json",
  "vite.config.js",
];

const libraries = [
  {
    name: "@skynoveau-ui/core",
    rootPath: "package/react/core",
    pathList: pathList,
    versionCheck: true,
  },
  {
    name: "@skynoveau-ui/utils",
    rootPath: "package/react/utils",
    pathList: pathList,
    versionCheck: true,
  },
  {
    name: "playground",
    rootPath: "playground",
    pathList: pathList,
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

for (const { name, rootPath, pathList, versionCheck } of libraries) {
  try {
    console.log(`📦 Checking: ${name}`);

    const pkgPath = `${rootPath}/package.json`;
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

    // ✅ 1. Local file: dependency check
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
      console.error(`❌ Local path dependencies found: ${name}`);
      fileDeps.forEach(([dep, path]) => {
        console.error(`   - ${dep}: ${path}`);
      });
      failed = true;
    } else {
      console.log("✅ No local path dependencies.");
    }

    // ✅ 2. Check file changes in specified pathList
    const changePaths = pathList.map((p) => `${rootPath}/${p}`).join(" ");
    const changes = execSync(`git status --porcelain ${changePaths}`, {
      encoding: "utf-8",
    }).trim();

    if (!changes) {
      console.log("✅ No changes in tracked paths.");
    } else {
      console.log("📁 Changes detected in tracked files.");
    }

    // ✅ 3. Version check (if enabled)
    if (versionCheck && changes) {
      const localVersion = pkg.version;

      let publishedVersion = "0.0.0";
      try {
        publishedVersion = execSync(`npm view ${name} version`, {
          encoding: "utf-8",
          stdio: ["pipe", "pipe", "ignore"],
        }).trim();
      } catch {
        console.warn(`⚠️  ${name} not found on npm. Skipping version check.`);
        continue;
      }

      if (!isVersionGreater(localVersion, publishedVersion)) {
        console.error(`❌ Version mismatch: ${name}`);
        console.error(`   - Local:     ${localVersion}`);
        console.error(`   - Published: ${publishedVersion}`);
        failed = true;
      } else {
        console.log("✅ Version is greater than published.");
      }
    } else if (!versionCheck) {
      console.log("ℹ️  Version check skipped.");
    }

    console.log(); // spacer
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
