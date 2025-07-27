import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { PLAYGROUND_LIST } from "./constant.js";

function updatePackageVersion(label, pkgName, pkgJsonPath) {
  const latestVersion = execSync(`npm show ${pkgName} version`)
    .toString()
    .trim();

  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));

  let updated = false;
  if (pkgJson.dependencies?.[pkgName]) {
    pkgJson.dependencies[pkgName] = latestVersion;
    updated = true;
  }
  if (pkgJson.devDependencies?.[pkgName]) {
    pkgJson.devDependencies[pkgName] = latestVersion;
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));
    console.log(`${label} - ${pkgName}`);
    console.log(`   - version: ${latestVersion}`);
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
    // 1. Update in playground's package.json
    updatePackageVersion("Playground", pkg.name, playgroundPkgPath);

    // 2. Update in library's package.json
    const pkgJsonPath = path.join(pkg.rootPath, "package.json");
    updatePackageVersion("Package", pkg.name, pkgJsonPath);

    // 3. Update export field in library's package.json
    updateExportFields("Package", pkg.name, pkgJsonPath);

    console.log(`\n`);
  }

  fs.writeFileSync(".pre-build-complete", new Date().toISOString());
  console.log("\n.pre-build-complete written");
  console.log(
    "***************** Pre-build checks completed *****************\n"
  );
}
