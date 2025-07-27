// scripts/clean.mjs
import { execSync } from "child_process";
import { PLAYGROUND_LIST } from "./constant.js";

const runClean = (name, rootPath) => {
  try {
    console.log(`${name} :`);
    console.log(`🧹 Cleaning...`);
    execSync(`rm -rf dist .vite node_modules`, {
      cwd: rootPath,
      stdio: "inherit",
      shell: true,
    });
    console.log(`✅ Cleaned\n`);
  } catch (err) {
    console.error(`❌ Failed to clean\n`);
    console.error(err.message);
    process.exit(1);
  }
};

// Step 0: Clean root
runClean("root", ".");

// Step 1: Clean each playground and its local packages
for (const playground of PLAYGROUND_LIST) {
  const { name, rootPath, localPkgList } = playground;

  runClean(`playground/${name}`, rootPath);

  for (const { name: pkgName, rootPath: pkgPath } of localPkgList) {
    runClean(pkgName, pkgPath);
  }
}
