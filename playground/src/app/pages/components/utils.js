export const getLabel = (inputString) => {
  // Check if the string contains a hyphen
  if (inputString.includes("-")) {
    // Split by hyphen, capitalize each part, and join without hyphens
    return inputString
      .split("-")
      .map((word) => {
        // Capitalize the first letter of each word
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join("");
  } else if (inputString.includes(" ")) {
    // If it contains spaces but no hyphens, capitalize the first letter of the first word
    // and return the rest as is.
    const parts = inputString.split(" ");
    if (parts.length > 0) {
      parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    }
    return parts.join(" ");
  } else {
    // If no hyphens or spaces, just capitalize the first letter of the whole string
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }
};

export const getPath = (input) => {
  return input
    .split(/(\s+-\s+|\s+)/) // split by " - " or spaces, keep separators
    .map((part) => {
      if (part.trim() === "") return part; // keep spaces
      if (/^\s+-\s+$/.test(part)) return " - "; // keep " - " as is

      // For "FormFields" type input, insert dashes between lowercase-uppercase
      if (/^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/.test(part)) {
        return part.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      }

      return part.toLowerCase();
    })
    .join("");
};
