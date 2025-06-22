import fs from "fs";
import path from "path";

const libraries = [
  {
    name: "@skynoveau-ui/core",
    rootPath: "../package/react/core",
  }
];

for (const { name, rootPath } of libraries) {
  const pkgPath = path.resolve(rootPath, "package.json");
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
}
