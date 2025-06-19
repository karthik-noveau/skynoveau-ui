import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const repoRoot = execSync("git rev-parse --show-toplevel", {
  encoding: "utf-8",
}).trim();
process.chdir(repoRoot);

const libraries = [
  {
    name: "@skynoveau-ui/core",
    rootPath: "package/react/core",
    autoUpdate: true,
  },
  {
    name: "@skynoveau-ui/utils",
    rootPath: "package/react/utils",
    autoUpdate: false,
  },
];

for (const { name, rootPath, autoUpdate } of libraries) {
  try {
    if (!autoUpdate) continue;

    console.log(`\n📦 Updating ${name}`);

    const pkgPath = `${rootPath}/package.json`;
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

    // ✅ 1. Update exports field
    const desiredExports = {
      ".": {
        import: "./dist/index.js",
        types: "./dist/index.d.ts",
      },
    };
    let updated = false;

    if (JSON.stringify(pkg.exports) !== JSON.stringify(desiredExports)) {
      pkg.exports = desiredExports;
      updated = true;
      console.log("✅ Updated exports field to use dist.");
    }

    // ✅ 2. Get published version and bump patch
    const publishedVersion = execSync(`npm view ${name} version`, {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "ignore"],
    }).trim();

    const bumpPatch = (version) => {
      const parts = version.split(".").map(Number);
      parts[2] += 1;
      return parts.join(".");
    };

    const nextVersion = bumpPatch(publishedVersion);
    if (pkg.version !== nextVersion) {
      pkg.version = nextVersion;
      updated = true;
      console.log(`✅ Bumped version: ${publishedVersion} → ${nextVersion}`);
    } else {
      console.log("✅ Version already updated.");
    }

    // ✅ 3. Write changes if any
    if (updated) {
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
      execSync(`git add ${pkgPath}`);
      execSync(`git commit -m "chore(${name}): update version and exports"`);
      execSync(`git push`);
      console.log("🚀 Changes committed and pushed.");
    } else {
      console.log("🟢 No changes to commit.");
    }
  } catch (err) {
    console.error(`❌ Failed to update ${name}: ${err.message}`);
    process.exit(1);
  }
}

console.log("\n✅ All pre-push tasks completed.\n");
