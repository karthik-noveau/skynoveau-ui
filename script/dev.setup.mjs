import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { LIBRARY_LIST, PLAYGROUND_LIST } from "./constant.js";

const args = process.argv.slice(2);
const target = args[0].split("/")[1];

for (const { name, rootPath, localPkgList } of PLAYGROUND_LIST) {
  if (name.startsWith(`playground/${target}`)) {
    console.log("\nDev setup initiated ... \n");

    const pkgPath = path.join(rootPath, "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

    const desiredExports = {
      ".": {
        import: "./src/index.ts",
        types: "./dist/index.d.ts",
      },
    };

    const isUpdated =
      JSON.stringify(pkg.exports) !== JSON.stringify(desiredExports);

    if (isUpdated) {
      pkg.exports = desiredExports;
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
      console.log(`✅ [${name}] exports path updated to dev path\n`);
    } else {
      console.log(`✅ [${name}] exports path already in dev path\n`);
    }

    const filteredPkgList = LIBRARY_LIST.filter(({ name }) =>
      localPkgList.includes(name)
    );

    filteredPkgList.forEach(({ name, rootPath: pkgRootPath }) => {
      const absolutePkgPath = path.resolve(pkgRootPath);
      console.log(
        `Installing ${name} from ${absolutePkgPath} into ${rootPath}`
      );
      try {
        execSync(`npm install ${absolutePkgPath}`, {
          cwd: path.resolve(rootPath),
          stdio: "inherit",
          shell: true,
        });
        console.log(`✅ Installed local ${name} in ${rootPath}`);
      } catch (err) {
        console.error(`❌ Failed to install local ${name} in ${rootPath}`);
        process.exit(1);
      }
    });
  }
}
