import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { PLAYGROUND_LIST } from "./constant.js";

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("❌ No playground target provided");
  process.exit(1);
}

const target = args[0];

const matchedPlayground = PLAYGROUND_LIST.find(({ name }) => name === target);
if (!matchedPlayground) {
  console.error(`❌ Playground "${target}" not found in PLAYGROUND_LIST`);
  process.exit(1);
}

const { name, rootPath, localPkgList } = matchedPlayground;

console.log(`\n🚧 Dev setup initiated for playground "${name}"...\n`);

for (const { name: pkgName, rootPath: pkgRootPath } of localPkgList) {
  const absolutePkgPath = path.resolve(pkgRootPath);
  const pkgPath = path.join(pkgRootPath, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

  // Step 1: Update exports in local pacakge's package.json
  try {
    const desiredExports = {
      ".": {
        import: "./src/index.ts",
        types: "./dist/index.d.ts",
      },
    };

    const isUpdated =
      JSON.stringify(pkg.exports) !== JSON.stringify(desiredExports);

    console.log("pkg.exports ", pkg.exports);
    console.log("isUpdated ", isUpdated);

    if (isUpdated) {
      pkg.exports = desiredExports;
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
      console.log(`✅ [playground-${name}] exports path updated to dev path\n`);
    } else {
      console.log(`✅ [playground-${name}] exports path already in dev path\n`);
    }
  } catch (err) {
    console.error(`❌ Failed to update exports for ${name}`);
    console.error(err.message);
    process.exit(1);
  }

  // Step 2: Install all local packages listed in localPkgList
  try {
    execSync(`npm install ${absolutePkgPath}`, {
      cwd: path.resolve(rootPath),
      stdio: "inherit",
      shell: true,
    });
    console.log(`✅ Installed local ${pkgName} in ${rootPath}\n`);
  } catch (err) {
    console.error(`❌ Failed to install local ${pkgName} in ${rootPath}`);
    console.error(err.message);
    process.exit(1);
  }
}
