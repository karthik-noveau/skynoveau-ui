import fs from "fs";
import path from "path";

const componentsDir = path.resolve("dist/components");

const importStatement = `import { injectGlobalStyles } from "../../styles/index";\n`;
const injectCall = `injectGlobalStyles();\n`;

// Read all folders inside dist/components
function processFolder(folderPath) {
  const indexFile = path.join(folderPath, "index.ts");

  if (fs.existsSync(indexFile)) {
    let content = fs.readFileSync(indexFile, "utf-8");

    if (!content.includes("injectGlobalStyles")) {
      // Add import and inject call at the top (after any existing imports)
      // Find the last import statement to append after it

      const importRegex = /^import .+ from .+;$/gm;
      let lastImportMatch;
      let match;
      while ((match = importRegex.exec(content)) !== null) {
        lastImportMatch = match;
      }

      if (lastImportMatch) {
        // Insert after last import line
        const insertPos = lastImportMatch.index + lastImportMatch[0].length;
        content =
          content.slice(0, insertPos) +
          `\n${importStatement}${injectCall}` +
          content.slice(insertPos);
      } else {
        // No imports found, just add on top
        content = `${importStatement}${injectCall}\n${content}`;
      }

      fs.writeFileSync(indexFile, content, "utf-8");
      console.log(`Injected in ${indexFile}`);
    } else {
      console.log(`Already injected in ${indexFile}`);
    }
  }
}

// Recursively traverse components dir
function walkDir(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      walkDir(fullPath);
    }
  }
  processFolder(dir);
}

walkDir(componentsDir);
