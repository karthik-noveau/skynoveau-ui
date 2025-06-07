import fs from "fs";
import path from "path";

const packageJsonPath = path.resolve(process.cwd(), "package.json");

if (!fs.existsSync(packageJsonPath)) {
  console.warn("⚠️ package.json not found.");
  process.exit(0);
}

const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
const deps = {
  ...pkg.dependencies,
  ...pkg.devDependencies,
  ...pkg.peerDependencies,
};

const localDeps = Object.entries(deps || {}).filter(
  ([_, v]) => typeof v === "string" && v.startsWith("file:")
);

if (localDeps.length > 0) {
  console.error(
    "\n❌ Push blocked: Found local path dependencies in package.json:"
  );
  localDeps.forEach(([name, version]) => {
    console.error(` - ${name}: ${version}`);
  });
  console.error(
    "\nPlease replace local paths with published npm versions before pushing.\n"
  );
  process.exit(1);
} else {
  console.log("✅ No local dependencies found. Ready to push.");
}
