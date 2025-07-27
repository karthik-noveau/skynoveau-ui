import { execSync } from "child_process";
import { PLAYGROUND_LIST } from "./constant.js";

const runInstall = (label, rootPath) => {
  try {
    const prefix = rootPath === "." ? "" : `--prefix ${rootPath}`;
    console.log(`📦 Installing dependencies in ${label}`);
    execSync(`npm install ${prefix}`.trim(), {
      stdio: "inherit",
      shell: true,
    });
    console.log(`✅ Installed : ${label}\n`);
  } catch (err) {
    console.error(`❌ Failed to install : ${label}\n`);
    console.error(err.message);
    process.exit(1);
  }
};

execSync(`npm run clean:all`, {
  stdio: "inherit",
  shell: true,
});

// Step 1: Install at root
runInstall("root", ".");

// Step 1: Install playground and its local packages
for (const playground of PLAYGROUND_LIST) {
  const { name, rootPath, localPkgList } = playground;

  runInstall(`playground/${name}`, rootPath);

  for (const { name: pkgName, rootPath: pkgPath } of localPkgList) {
    runInstall(pkgName, pkgPath);
  }
}
