import fs from "fs";
import path from "path";

// List of folders to check
const pathsToCheck = [
  "playground/package.json",
  "package/react/components/package.json",
  "package/react/utils/package.json",
];

let hasLocalDeps = false;

for (const relPath of pathsToCheck) {
  const fullPath = path.resolve(relPath);

  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️ ${relPath} not found. Skipping.`);
    continue;
  }

  const pkg = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
  const deps = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
    ...pkg.peerDependencies,
  };

  const localDeps = Object.entries(deps || {}).filter(
    ([_, v]) => typeof v === "string" && v.startsWith("file:")
  );

  if (localDeps.length > 0) {
    hasLocalDeps = true;
    console.error(`\n❌ Found local path dependencies in ${relPath}:`);
    localDeps.forEach(([name, version]) => {
      console.error(` - ${name}: ${version}`);
    });
  }
}

if (hasLocalDeps) {
  console.error(
    "\n❌ Push blocked: Replace local paths with published npm versions before pushing.\n"
  );
  process.exit(1);
} else {
  console.log("✅ No local dependencies found. Ready to push.");
}
