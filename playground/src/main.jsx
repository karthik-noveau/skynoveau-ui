import { Button, RippleButton } from "@skynoveau-ui/core";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// import App from "./app";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <Button>button</Button>
    <RippleButton>asdfasdf</RippleButton>

    {/* <App /> */}
  </StrictMode>
);
