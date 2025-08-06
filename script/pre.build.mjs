import fs, { existsSync, rmSync, unlinkSync } from "fs";
import path from "path";
import { execSync } from "child_process";
import { PLAYGROUND_LIST } from "./constant.js";

function cleanNodeModulesAndLock(dir) {
  const nodeModulesPath = path.join(dir, "node_modules");
  const lockFilePath = path.join(dir, "package-lock.json");

  if (existsSync(nodeModulesPath)) {
    rmSync(nodeModulesPath, { recursive: true, force: true });
    console.log(`   - node_modules removed`);
  }

  if (existsSync(lockFilePath)) {
    unlinkSync(lockFilePath);
    console.log(`   - package-lock.json removed`);
  }
}

function updatePackageVersion(label, pkgName, pkgJsonPath) {
  const latestVersion = execSync(`npm show ${pkgName} version`)
    .toString()
    .trim();

  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
  let updated = false;

  // Replace dependency versions
  if (pkgJson.dependencies?.[pkgName]) {
    pkgJson.dependencies[pkgName] = `^${latestVersion}`;
    updated = true;
  }

  if (pkgJson.devDependencies?.[pkgName]) {
    pkgJson.devDependencies[pkgName] = `^${latestVersion}`;
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));
    console.log(`${label} - ${pkgName}`);
    console.log(`   - updated to version: ^${latestVersion}`);

    const dir = path.dirname(pkgJsonPath);

    // 🔥 Clean lock file and node_modules before reinstalling
    cleanNodeModulesAndLock(dir);

    // Reinstall cleanly
    execSync("npm install", { cwd: dir, stdio: "inherit" });
    console.log(`   - clean install complete`);
  }
}

function updateExportFields(label, pkgName, pkgJsonPath) {
  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));

  pkgJson.exports = {
    ".": {
      import: "./index.js",
      require: "./index.js",
    },
  };

  fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));

  console.log(`${label} - ${pkgName}`);
  console.log(`   - export: updated`);
}

for (const playground of PLAYGROUND_LIST) {
  const playgroundPkgPath = path.join(playground.rootPath, "package.json");

  for (const pkg of playground.localPkgList) {
    // 1. Revert local package to npm version in playground
    updatePackageVersion("Playground", pkg.name, playgroundPkgPath);

    // 2. Optionally update the package's own version (if needed)
    const pkgJsonPath = path.join(pkg.rootPath, "package.json");
    updatePackageVersion("Package", pkg.name, pkgJsonPath);

    // 3. Update the export field for consistency
    updateExportFields("Package", pkg.name, pkgJsonPath);

    console.log(`\n`);
  }

  fs.writeFileSync(".pre-build-complete", new Date().toISOString());
  console.log("\n.pre-build-complete written");
  console.log(
    "***************** Pre-build checks completed *****************\n"
  );
}
