import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Button, RippleButton, ShineButton } from "skynoveau-ui/button";

// optional: import global styles if needed
// import "skynoveau-ui/styles";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <div>
        <Button>Button</Button>
        <RippleButton>Ripple</RippleButton>
        <ShineButton>SHine</ShineButton>

        <Routes>
          <Route path="/page" element={<h1>Page Content</h1>} />
        </Routes>

        <Link to="/page">Go to Page</Link>
      </div>
    </BrowserRouter>
  </StrictMode>
);
