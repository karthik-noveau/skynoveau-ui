import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { LIBRARY_LIST, PLAYGROUND_LIST } from "./constant.js";

const repoRoot = execSync("git rev-parse --show-toplevel", {
  encoding: "utf-8",
}).trim();
process.chdir(repoRoot);

let failed = false;

for (const { name, rootPath, allowVersionChange } of LIBRARY_LIST) {
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
        stdio: ["pipe", "pipe", "ignore"], // ⛔️ suppress stderr (where npm notices are printed)
      }).trim();
    } catch {
      console.warn(`⚠️  Could not fetch latest version for ${name}`);
      failed = true;
      continue;
    }

    // ✅ 3. Update latest dependency version of library in playground
    if (allowVersionChange) {
      for (const { name: playground_name, rootPath } of PLAYGROUND_LIST) {
        const pkgPath = path.join(rootPath, "package.json");
        const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
        const prevVersion = pkg.dependencies?.[name] || "(not found)";

        pkg.dependencies = {
          ...(pkg.dependencies || {}),
          [name]: latestVersion,
        };

        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
        console.log(
          `✅ Latest dependency version updated in ${playground_name}`
        );
        console.log(`     ↪ Previous: ${prevVersion}`);
        console.log(`     ↪ Updated : ${latestVersion}`);
      }
    } else {
      console.log(`ℹ️  Latest dependency version update skipped`);
    }
  } catch (err) {
    console.error(`\n⚠️  Error processing ${name}: ${err.message}`);
    failed = true;
  }
}

if (failed) {
  console.error(
    "\n***************** Pre-build checks failed *****************\n"
  );
  process.exit(1);
} else {
  fs.writeFileSync(".pre-build-complete", new Date().toISOString());
  console.log("\n.pre-build-complete written");
  console.log(
    "\n***************** Pre-build checks completed *****************\n"
  );
}
