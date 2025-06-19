import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const repoRoot = execSync("git rev-parse --show-toplevel", {
  encoding: "utf-8",
}).trim();
process.chdir(repoRoot);

const libraries = [
  {
    name: "@skynoveau-ui/core",
    rootPath: "package/react/core",
    playground: true,
  },
  {
    name: "@skynoveau-ui/utils",
    rootPath: "package/react/utils",
    playground: false,
  },
];

const consumers = ["playground/package.json"];
let failed = false;

for (const { name, rootPath, playground } of libraries) {
  try {
    console.log(`\n📦 Pre building... in [ ${name} ]`);

    const pkgPath = path.join(rootPath, "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

    // ✅ 1. Update exports
    const desiredExports = {
      ".": {
        import: "./dist/index.js",
        types: "./dist/index.d.ts",
      },
    };

    if (JSON.stringify(pkg.exports) !== JSON.stringify(desiredExports)) {
      pkg.exports = desiredExports;
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
      console.log(`✅ Updated exports in ${name} to 'dist/index.js'`);
    } else {
      console.log(`✅ Exports already set to 'dist/index.js'`);
    }

    // ✅ 2. Get latest published version from npm
    let latestVersion = "";
    try {
      latestVersion = execSync(`npm view ${name} version`, {
        encoding: "utf-8",
      }).trim();
    } catch {
      console.warn(`⚠️  Could not fetch latest version for ${name}`);
      failed = true;
      continue;
    }

    // ✅ 3. Update version in consumer (only if `playground: true`)
    if (playground) {
      for (const consumerPath of consumers) {
        const fullPath = path.resolve(consumerPath);
        const consumerPkg = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
        const prevVersion = consumerPkg.dependencies?.[name] || "(not found)";

        consumerPkg.dependencies = {
          ...(consumerPkg.dependencies || {}),
          [name]: latestVersion,
        };

        fs.writeFileSync(fullPath, JSON.stringify(consumerPkg, null, 2));
        console.log(`✅ Latest dependence version updated`);
        console.log(`     ↪ Previous: ${prevVersion}`);
        console.log(`     ↪ Updated : ${latestVersion}`);
      }
    } else {
      console.log(`ℹ️  Latest dependence version updated skipped`);
    }
  } catch (err) {
    console.error(`\n⚠️  Error processing ${name}: ${err.message}`);
    failed = true;
  }
}

if (failed) {
  console.error("\n❌ Pre build checks failed\n");
  process.exit(1);
} else {
  fs.writeFileSync(".prebuild-complete", new Date().toISOString());
  console.log("\n.prebuild-complete written");
  console.log("\n***************** Pre build successful *****************\n");
}
