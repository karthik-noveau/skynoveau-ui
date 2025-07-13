// scripts/clean.mjs
import { execSync } from "child_process";
import { PLAYGROUND_LIST } from "./constant.js";
import { LIBRARY_LIST } from "./constant.js";

const runClean = (name, rootPath) => {
  try {
    console.log(`🧹 Cleaning ${name} at ${rootPath}`);
    execSync(`rm -rf dist .vite node_modules`, {
      cwd: rootPath,
      stdio: "inherit",
      shell: true,
    });
    console.log(`✅ Cleaned ${name}\n`);
  } catch (err) {
    console.error(`❌ Failed to clean ${name} at ${rootPath}`);
    console.error(err.message);
    process.exit(1);
  }
};

// Step 0: Clean root
runClean("root", ".");

// Step 1: Clean playground(s)
for (const { name, rootPath } of PLAYGROUND_LIST) {
  runClean(name, rootPath);
}

// Step 2: Clean libraries
for (const { name, rootPath } of LIBRARY_LIST) {
  runClean(name, rootPath);
}
