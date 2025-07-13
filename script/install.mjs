import { execSync } from "child_process";
import { LIBRARY_LIST } from "./constant.js";
import { PLAYGROUND_LIST } from "./constant.js";

const runInstall = (label, rootPath) => {
  try {
    const prefix = rootPath === "." ? "" : `--prefix ${rootPath}`;
    console.log(`📦 Installing dependencies in ${label}`);
    execSync(`npm install ${prefix}`.trim(), {
      stdio: "inherit",
      shell: true,
    });
    console.log(`✅ Installed: ${label}\n`);
  } catch (err) {
    console.error(`❌ Failed to install ${label} at ${rootPath}`);
    console.error(err.message);
    process.exit(1);
  }
};

// Step 1: Install at root
runInstall("root", ".");

// Step 2: Install for playground(s)
for (const { name, rootPath } of PLAYGROUND_LIST) {
  runInstall(name, rootPath);
}

// Step 3: Install for libraries
for (const { name, rootPath } of LIBRARY_LIST) {
  runInstall(name, rootPath);
}
