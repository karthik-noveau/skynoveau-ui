export const getPath = (text) => {
  return text
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
};

export const getLabel = (text) => {
  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2") // insert space between camelCase
    .replace(/[-_]+/g, " ") // replace dashes/underscores with space
    .replace(/\s+/g, " ") // collapse multiple spaces
    .trim()
    .split(" ") // split into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize each word
    .join(" ");
};

export const getComponentName = (text) => {
  return text
    .replace(/[-_]+/g, " ") // Convert kebab-case or snake_case to space
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between camelCase words
    .replace(/\s+/g, " ") // Collapse multiple spaces
    .trim()
    .split(" ") // Split into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join("");
};
