import fs from "fs";
import path from "path";

const corePkgPath = path.resolve("../package/react/core/package.json");

const corePkg = JSON.parse(fs.readFileSync(corePkgPath, "utf-8"));

// Update `exports` field if needed
const desiredExports = {
  ".": {
    import: "./src/index.ts",
    types: "./dist/index.d.ts",
  },
};

const updated =
  JSON.stringify(corePkg.exports) !== JSON.stringify(desiredExports);

if (updated) {
  corePkg.exports = desiredExports;
  fs.writeFileSync(corePkgPath, JSON.stringify(corePkg, null, 2));
  console.log("✅ Exports path updated in react/core package.json");
} else {
  console.log("✅ Exports path already correct in react/core package.json");
}
