import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import { LazyImport } from "@skynoveau-ui/core";

import "./styles.css";
import "./theme.css";

// --------- Lazy-loaded components ----------
const HomePage = LazyImport(() => import("./pages/home"), "HomePage");

const ComponentsSystem = LazyImport(
  () => import("./pages/components"),
  "ComponentsSystem"
);
const ComponentPreview = LazyImport(
  () => import("./pages/preview"),
  "ComponentPreview"
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/components" element={<ComponentsSystem />} />
        <Route path="/components/:id" element={<ComponentsSystem />} />
        <Route
          path="/components/:componentId/:variantId/preview"
          element={<ComponentPreview />}
        />
      </Routes>
    </BrowserRouter>
  );
}
