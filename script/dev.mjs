import { execSync } from "child_process";
import path from "path";
import { PLAYGROUND_LIST } from "./constant.js";

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
  console.error("  npm run playground react");
  console.error("  npm run playground react watch\n");
  process.exit(1);
}

const playground = PLAYGROUND_LIST.find(({ name }) => name === target);

if (!playground) {
  console.error(`❌ Playground "${target}" not found in PLAYGROUND_LIST.`);
  process.exit(1);
}

const { rootPath, localPkgList } = playground;

console.log(
  `\n🚀 Starting playground for ${target} ${isWatchMode ? "(watch mode)" : ""}`
);

if (!isWatchMode) {
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
} else {
  // Run dev.setup.mjs
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

  // Create watcher and playground dev tasks
  const concurrently = await import("concurrently");
  const commands = [];

  for (const { name: pkgName, rootPath } of localPkgList) {
    const absolutePath = path.resolve(rootPath);
    const buildCmd = `npm --prefix ${rootPath} run build && echo '✅ ${pkgName} build done'`;
    const watchCmd = `echo '🔎 Watching ${pkgName}...' && chokidar "${absolutePath}/src/**/*" "${absolutePath}/package.json" --initial --verbose --debounce 500 -c "${buildCmd}"`;

    commands.push({
      name: `watch-${pkgName}`,
      command: watchCmd,
      cwd: ".",
      prefixColor: "cyan",
    });
  }

  commands.push({
    name: `dev-${target}`,
    command: "npm run dev",
    cwd: rootPath,
    prefixColor: "green",
  });

  try {
    concurrently.default(commands, {
      prefix: "name",
    });
  } catch (err) {
    console.error("❌ Failed in watch mode:", err.message);
    process.exit(1);
  }
}
