// scripts/check-local-deps.js

const fs = require("fs");
const path = require("path");

const pkg = require(path.resolve(process.cwd(), "package.json"));
const deps = {
  ...pkg.dependencies,
  ...pkg.devDependencies,
  ...pkg.peerDependencies,
};

const localDeps = Object.entries(deps).filter(([name, version]) =>
  version.startsWith("file:")
);

if (localDeps.length > 0) {
  console.error(
    "❌ Local dependencies found. Please publish or link the following first:"
  );
  localDeps.forEach(([name, version]) =>
    console.error(`- ${name}: ${version}`)
  );
  process.exit(1);
}
