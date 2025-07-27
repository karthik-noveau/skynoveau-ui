import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { LIBRARY_LIST } from "./constant.js";

// Step 0: Parse target
const targetType = process.argv[2]; // e.g., "react"
const targetPkg = process.argv[3]; // e.g., "@skynoveau-ui/core"

if (!(targetType && targetPkg)) {
  console.error("❌ Invalid args");
  console.error("Usage : npm run publish <library_type>  <library_name> \n");
  process.exit(1);
}

const lib = LIBRARY_LIST[targetType].find(({ name }) => name === targetPkg);

if (!lib) {
  console.error(`❌ Package not found in LIBRARY_LIST.`);
  process.exit(1);
}

const { name, rootPath } = lib;
const pkgPath = path.join(rootPath, "package.json");
const distPath = path.join(rootPath, "dist");

console.log(`\n🚀 Publishing: ${name} from ${rootPath}`);

// Step 1: Validate and prepare
let failed = false;

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

try {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

  console.log(`\n📦 Pre-publish checks for [${pkg.name}]\n`);

  // ✅ 1. Check for local path dependencies
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
    console.error(`❌ Local path dependencies found:`);
    fileDeps.forEach(([dep, val]) => console.error(`   - ${dep}: ${val}`));
    failed = true;
  } else {
    console.log("✅ No local path dependencies");
  }

  // ✅ 2. Validate exports field
  const expectedExports = {
    ".": {
      import: "./dist/index.js",
      types: "./dist/index.d.ts",
    },
  };

  if (JSON.stringify(pkg.exports) !== JSON.stringify(expectedExports)) {
    pkg.exports = expectedExports;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
    console.log("✅ Export updated");
  } else {
    console.log("✅ Exports already updated");
  }

  // ✅ 3. Validate version bump
  try {
    const publishedVersion = execSync(`npm view ${pkg.name} version`, {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "ignore"],
    }).trim();

    if (!isVersionGreater(pkg.version, publishedVersion)) {
      console.error("❌ Version not updated:");
      console.error(`   - Local:     ${pkg.version}`);
      console.error(`   - Published: ${publishedVersion}`);
      failed = true;
    } else {
      console.log("✅ Version is greater than published");
    }
  } catch {
    console.log("ℹ️  Package not found on npm. Skipping version check.");
  }
} catch (err) {
  console.error(`Failed reading/validating package.json: ${err.message}`);
  failed = true;
}

if (failed) {
  console.error("\nPre-publish checks failed.\n");
  process.exit(1);
}

// Step 2: Build
try {
  console.log("\n🏗  Building the package...");
  execSync(`npm run build`, {
    cwd: rootPath,
    stdio: "inherit",
    shell: true,
  });

  if (!fs.existsSync(distPath)) {
    console.error("Build failed. dist/ folder missing.");
    process.exit(1);
  } else {
    console.log("✅ Build completed, dist/ folder found.");
  }
} catch (err) {
  console.error(`Build failed: ${err.message}`);
  process.exit(1);
}

// Step 3: Publish
try {
  console.log("\n📤 Publishing to NPM...");
  execSync(`npm publish --access public`, {
    cwd: rootPath,
    stdio: "inherit",
    shell: true,
  });

  console.log(`\n🎉 ${name} successfully published from ${rootPath} 🎉\n`);
} catch (err) {
  console.error(`\nFailed to publish ${name}: ${err.message}\n`);
  process.exit(1);
}
