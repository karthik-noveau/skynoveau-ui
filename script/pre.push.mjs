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
    versionCheck: false,
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
      console.log("\n✅ No local path dependencies.");
    }

    // ✅ 2. Git change check
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

    // ✅ 3. Version check
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
        console.error(`\n❌ Version not updated`);
        console.error(`   - Local:     ${localVersion}`);
        console.error(`   - Published: ${publishedVersion}`);
        failed = true;
      } else {
        console.log("\n✅ Version is greater than published.");
      }
    } else if (!versionCheck) {
      console.log("\nℹ️  Version check skipped.");
    }

    // ✅ 4. Update exports field to use dist for published build
    if (updateExportsToDist) {
      const desiredExports = {
        ".": {
          import: "./dist/index.js",
          types: "./dist/index.d.ts",
        },
      };
      const currentExports = pkg.exports;

      if (JSON.stringify(currentExports) !== JSON.stringify(desiredExports)) {
        pkg.exports = desiredExports;
        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
        console.log(`\n✅ Updated exports in ${name} to use dist/index.js`);
      } else {
        console.log(`\n✅ Exports already set to dist/index.js`);
      }
    }

    // ✅ 5. Update main package.json to use latest published version
    if (updateVersionInRootPackageJson) {
      const rootPkgPath = path.resolve("./package.json");
      const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, "utf-8"));

      let publishedVersion = execSync(`npm view ${name} version`, {
        encoding: "utf-8",
      }).trim();

      const current = rootPkg.dependencies?.[name];
      if (current !== publishedVersion) {
        rootPkg.dependencies = {
          ...rootPkg.dependencies,
          [name]: publishedVersion,
        };
        fs.writeFileSync(rootPkgPath, JSON.stringify(rootPkg, null, 2));
        console.log(
          `\n✅ Updated ${name} version to ${publishedVersion} in root package.json`
        );
      } else {
        console.log(
          `\n✅ ${name} version already up to date in root package.json`
        );
      }
    }

    console.log(); // spacer
  } catch (err) {
    console.error(`\n⚠️  Error checking ${name}: ${err.message}`);
    failed = true;
  }
}

if (failed) {
  console.error("\n ❌ Pre-push checks failed. Please fix above issues.\n");
  process.exit(1);
} else {
  console.log("\n ✅ All pre-push checks passed.\n");
}
