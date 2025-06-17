import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const currentDir = process.cwd();
const repoRoot = execSync("git rev-parse --show-toplevel", {
  encoding: "utf-8",
}).trim();

process.chdir(repoRoot);

const pkgPath = path.join(currentDir, "package.json");

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

try {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  const name = pkg.name;

  console.log(`📦 Pre publish checking... in [ ${name} ]`);

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
    fileDeps.forEach(([dep, val]) => console.error(`   - ${dep}: ${val}`));
    failed = true;
  } else {
    console.log("\n✅ No local path dependencies.");
  }

  // ✅ 2. Check "main" and "exports" are correctly set for publish
  const expectedMain = "./dist/index.js";
  const expectedExportImport = "./dist/index.js";

  if (pkg.main !== expectedMain) {
    console.error(`\n❌ Invalid "main" field: expected "${expectedMain}"`);
    console.error(`   - Current value: ${pkg.main}`);
    failed = true;
  } else {
    console.log("\n✅ Valid 'main' field for publish.");
  }

  const exportImportPath = pkg.exports?.["."]?.import;
  if (exportImportPath !== expectedExportImport) {
    console.error(
      `\n❌ Invalid "exports['.'].import": expected "${expectedExportImport}"`
    );
    console.error(`   - Current value: ${exportImportPath}`);
    failed = true;
  } else {
    console.log("\n✅ Valid 'exports.import' field for publish.");
  }

  // ✅ 3. Version check
  const versionCheck = true;
  if (versionCheck) {
    const localVersion = pkg.version;

    let publishedVersion = "0.0.0";
    try {
      publishedVersion = execSync(`npm view ${name} version`, {
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "ignore"],
      }).trim();
    } catch {
      console.warn(`\n⚠️  ${name} not found on npm. Skipping version check.`);
    }

    if (!isVersionGreater(localVersion, publishedVersion)) {
      console.error(`\n❌ Version not updated: ${name}`);
      console.error(`   - Local:     ${localVersion}`);
      console.error(`   - Published: ${publishedVersion}`);
      failed = true;
    } else {
      console.log("\n✅ Version is greater than published.");
    }
  } else {
    console.log("\nℹ️  Version check skipped.");
  }
} catch (err) {
  console.error(`\n⚠️  Error checking package: ${err.message}`);
  failed = true;
}

if (failed) {
  console.error(
    "\n**************** Pre publish checks failed ****************\n"
  );
  process.exit(1);
} else {
  console.log(
    "\n**************** All pre publish checks passed ****************\n"
  );
}
