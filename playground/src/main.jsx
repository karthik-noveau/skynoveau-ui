import { Button, RippleButton, ShineButton } from "@skynoveau-ui/core";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { formatDate } from "@skynoveau-ui/utils";

// import App from "./app";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <Button>button</Button>
    <RippleButton> {formatDate({ label: "playground" })}</RippleButton>
    <ShineButton loading>asdf</ShineButton>

    {/* <App /> */}
  </StrictMode>
);
