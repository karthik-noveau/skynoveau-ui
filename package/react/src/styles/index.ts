let injected = false;

export const injectGlobalStyles = () => {
  if (injected) return;
  injected = true;

  console.log("injectGlobalStyles 2 ");

  import("./theme.css");
  import("./text.css");
  import("./weight.css");
  import("./color.css");
  import("./global.css");
  import("./global.override.css");
};
