import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// import App from "./app";
import { ThemeProvider } from "@theme";
import { AppProvider } from "@components/app-provider";

import { useAosApply } from "skynoveau-ui/hooks";

import { getValue } from "skynoveau-ui/utils";
import { Button } from "skynoveau-ui";

const Data = () => {
  useAosApply();
  return (
    <div>
      <Button>{getValue()}</Button>
    </div>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <ThemeProvider>
        <Data />
      </ThemeProvider>
    </AppProvider>
  </StrictMode>
);
