import { execSync } from "child_process";
import { LIBRARY_LIST } from "./constant.js";

const target = process.argv[2]; // e.g., "core"

if (!target) {
  console.error("❌ Invalid args");
  console.error("Usage : npm run publish <library_name> \n");
  process.exit(1);
}

const lib = LIBRARY_LIST.find(({ rootPath }) => rootPath.includes(target));

if (!lib) {
  console.error(`❌ Package not found in LIBRARY_LIST.`);
  process.exit(1);
}

console.log(`🚀 Publishing: ${lib.name} from ${lib.rootPath}`);

try {
  execSync(
    `node ../../../script/pre.publish.mjs && npm run build && npm publish --access public`,
    {
      cwd: lib.rootPath,
      stdio: "inherit",
      shell: true, // ✅ important for command chaining with `&&`
    }
  );

  console.log(
    `\n**************** ${lib.name} sucessfully published ****************\n`
  );
} catch (err) {
  console.error(
    `\n**************** Failed to publish ${lib.name} ****************\n`
  );
  process.exit(1);
}
