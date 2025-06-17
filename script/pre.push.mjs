import fs from "fs";
import { execSync } from "child_process";

const repoRoot = execSync("git rev-parse --show-toplevel", {
  encoding: "utf-8",
}).trim();
process.chdir(repoRoot);
console.log(`🔍 Running pre-push check from repo root: ${repoRoot}\n`);

const libraries = [
  {
    name: "@skynoveau-ui/core",
    rootPath: "package/react/core",
    versionCheck: false,
  },
  {
    name: "@skynoveau-ui/utils",
    rootPath: "package/react/utils",
    versionCheck: false,
  },
  {
    name: "playground",
    rootPath: "playground",
    versionCheck: false,
  },
];

function isVersionGreater(local, remote) {
  const parse = (v) => v.replace(/^v/, "").split(".").map(Number);
  const [lMajor, lMinor, lPatch] = parse(local);
  const [rMajor, rMinor, rPatch] = parse(remote);
  return (
    lMajor > rMajor ||
    (lMajor === rMajor && lMinor > rMinor) ||
    (lMajor === rMajor && lMinor === rMinor && lPatch > rPatch)
  );
}

let failed = false;

for (const { name, rootPath, versionCheck } of libraries) {
  try {
    console.log(`📦 Checking: ${name}`);

    const pkgPath = `${rootPath}/package.json`;
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

    // ✅ 1. Check local path dependencies
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
      console.error(`\n❌ Local path dependencies found in ${name}:`);
      fileDeps.forEach(([dep, path]) => console.error(`   - ${dep}: ${path}`));
      failed = true;
    } else {
      console.log("✅ No local path dependencies.");
    }

    // ✅ 2. Detect committed and staged changes
    const committed = execSync(`git diff --name-only origin/master...HEAD`, {
      encoding: "utf-8",
    })
      .trim()
      .split("\n");

    const staged = execSync(`git diff --name-only --cached`, {
      encoding: "utf-8",
    })
      .trim()
      .split("\n");

    const allChangedFiles = Array.from(
      new Set([...committed, ...staged])
    ).filter(Boolean);
    const gitChanges = allChangedFiles.filter((file) =>
      file.startsWith(rootPath)
    );

    if (gitChanges.length === 0) {
      console.log("\n✅ No changes detected.");
    } else {
      console.log("📁 Changes detected:");
      gitChanges.forEach((file) => console.log(`   - ${file}`));
    }

    // ✅ 3. Version check (if enabled and changes exist)
    if (versionCheck && gitChanges.length > 0) {
      const localVersion = pkg.version;

      let publishedVersion = "0.0.0";
      try {
        publishedVersion = execSync(`npm view ${name} version`, {
          encoding: "utf-8",
          stdio: ["pipe", "pipe", "ignore"],
        }).trim();
      } catch {
        console.warn(`\n⚠️  ${name} not found on npm. Skipping version check.`);
        continue;
      }

      if (!isVersionGreater(localVersion, publishedVersion)) {
        console.error(`\n❌ Version not updated : ${name}`);
        console.error(`   - Local:     ${localVersion}`);
        console.error(`   - Published: ${publishedVersion}`);
        failed = true;
      } else {
        console.log("\n✅ Version is greater than published.");
      }
    } else if (!versionCheck) {
      console.log("\nℹ️  Version check skipped.");
    }

    console.log(); // spacer
  } catch (err) {
    console.error(`\n⚠️  Error checking ${name}: ${err.message}`);
    failed = true;
  }
}

if (failed) {
  console.error(
    "\n **************** Pre push checks failed ****************\n"
  );
  process.exit(1);
} else {
  console.log(
    "\n **************** All pre push checks passed ****************\n"
  );
}
