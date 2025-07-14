import { execSync } from "child_process";
import { PLAYGROUND_LIST } from "./constant.js";
import path from "path";

const args = process.argv.slice(2);

let target = null;
let isWatchMode = false;

if (args.length === 1) {
  target = args[0];
} else if (args.length === 2 && args[1] === "watch") {
  target = args[0];
  isWatchMode = true;
} else {
  console.error("\n❌ Invalid arguments");
  console.error("Usage:");
  console.error("  npm run dev playground/react");
  console.error("  npm run dev playground/react watch\n");
  process.exit(1);
}

// Find matching playground
const playground = PLAYGROUND_LIST.find(({ name }) => name === target);

if (!playground) {
  console.error(`❌ Playground "${target}" not found in PLAYGROUND_LIST.`);
  process.exit(1);
}

const { name, rootPath } = playground;
console.log(
  `\n🚀 Starting dev for ${target} ${isWatchMode ? "( watch mode )" : ""}`
);

if (isWatchMode) {
  // ✅ Step 0: Run dev.setup.mjs first
  try {
    execSync(`node script/dev.setup.mjs ${target}`, {
      stdio: "inherit",
      shell: true,
    });
    console.log("🔧 Ran dev.setup.mjs successfully");
  } catch (err) {
    console.error("❌ Failed to run dev.setup.mjs:", err.message);
    process.exit(1);
  }

  // ✅ Step 1: Run watchers + playground concurrently
  const concurrently = await import("concurrently");
  const commands = [];

  const pkg_name = name.split("/")[1]; // e.g., 'react'
  const libRootPath = `./package/${pkg_name}/core`;
  const libPath = path.resolve(libRootPath);

  const build_cmd = `npm --prefix ${libRootPath} run build && echo '✅ [${pkg_name}/core] build completed'`;

  const watch_cmd = `echo '🔎 Watching [${pkg_name}/core]...' && chokidar "${libPath}/src/**/*" "${libPath}/package.json" --initial --verbose --debounce 500 -c "${build_cmd}"`;

  commands.push({
    name: `${pkg_name}-core`,
    command: watch_cmd,
    cwd: ".",
    prefixColor: "cyan",
  });

  commands.push({
    name: "playground",
    command: "npm run dev",
    cwd: rootPath,
    prefixColor: "green",
  });

  try {
    concurrently.default(commands, {
      prefix: "name",
    });
  } catch (err) {
    console.error("❌ Failed while running watch mode:", err.message);
    process.exit(1);
  }
} else {
  try {
    execSync("npm run dev", {
      cwd: rootPath,
      stdio: "inherit",
      shell: true,
    });
  } catch (err) {
    console.error(`❌ Failed to run dev in ${rootPath}`);
    process.exit(1);
  }
}
