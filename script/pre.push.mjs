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
    versionCheck: true,
    updateExportsToDist: true,
    updateVersionInRootPackageJson: true,
  },
  {
    name: "@skynoveau-ui/utils",
    rootPath: "package/react/utils",
    versionCheck: false,
    updateExportsToDist: false,
    updateVersionInRootPackageJson: false,
  },
  {
    name: "playground",
    rootPath: "playground",
    versionCheck: false,
    updateExportsToDist: false,
    updateVersionInRootPackageJson: false,
  },
];

function bumpPatch(version) {
  const [major, minor, patch] = version.split(".").map(Number);
  return `${major}.${minor}.${patch + 1}`;
}

let failed = false;

for (const {
  name,
  rootPath,
  versionCheck,
  updateExportsToDist,
  updateVersionInRootPackageJson,
} of libraries) {
  try {
    console.log(`\n📦 Pre push Checking... in [ ${name} ]`);

    const pkgPath = `${rootPath}/package.json`;
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

    // ✅ Git change check
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
      console.log("\n📁 File changes detected:");
    }

    // ✅ Version check + bump
    if (versionCheck && gitChanges.length > 0) {
      let publishedVersion = "0.0.0";
      try {
        publishedVersion = execSync(`npm view ${name} version`, {
          encoding: "utf-8",
          stdio: ["pipe", "pipe", "ignore"],
        }).trim();
      } catch {
        console.warn(`\n⚠️  ${name} not found on npm. Skipping version check.`);
      }

      if (pkg.version === publishedVersion) {
        const nextVersion = bumpPatch(publishedVersion);
        pkg.version = nextVersion;
        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
        execSync(`git add ${pkgPath}`);
        execSync(
          `git commit -m \"chore(${name}): bump version to ${nextVersion}\"`
        );
        console.log(
          `\n✅ Bumped version: ${publishedVersion} → ${nextVersion}`
        );
      } else {
        console.log(
          `\n✅ Local version (${pkg.version}) already ahead of published.`
        );
      }
    } else if (!versionCheck) {
      console.log("\nℹ️  Version check skipped.");
    }

    // ✅ Update exports to dist
    if (updateExportsToDist) {
      const desiredExports = {
        ".": {
          import: "./dist/index.js",
          types: "./dist/index.d.ts",
        },
      };
      if (JSON.stringify(pkg.exports) !== JSON.stringify(desiredExports)) {
        pkg.exports = desiredExports;
        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
        execSync(`git add ${pkgPath}`);
        console.log(`\n✅ Updated exports field to use dist.`);
      } else {
        console.log(`\n✅ Exports already set to dist.`);
      }
    }

    // ✅ Update root package.json version
    if (updateVersionInRootPackageJson) {
      const rootPkgPath = path.resolve("./package.json");
      const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, "utf-8"));

      const current = rootPkg.dependencies?.[name];
      let publishedVersion = execSync(`npm view ${name} version`, {
        encoding: "utf-8",
      }).trim();

      if (current !== publishedVersion) {
        rootPkg.dependencies = {
          ...rootPkg.dependencies,
          [name]: publishedVersion,
        };
        fs.writeFileSync(rootPkgPath, JSON.stringify(rootPkg, null, 2));
        execSync(`git add package.json`);
        console.log(
          `\n✅ Updated ${name} version in root package.json → ${publishedVersion}`
        );
      } else {
        console.log(
          `\n✅ ${name} version already up to date in root package.json`
        );
      }
    }
  } catch (err) {
    console.error(`\n❌ Error checking ${name}: ${err.message}`);
    failed = true;
  }
}

if (failed) {
  console.error("\n❌ Pre-push checks failed. Fix the issues above.");
  process.exit(1);
} else {
  console.log("\n✅ All pre-push checks passed.");
}
