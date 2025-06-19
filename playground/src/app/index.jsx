import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import { LazyImport } from "@skynoveau-ui/core";

import "./styles.css";
import "./theme.css";

// --------- Lazy-loaded components ----------
const HomePage = LazyImport(() => import("./pages/home"), 0);
const ThemePage = LazyImport(() => import("./pages/theme-preview"), 0);

const ComponentsSystem = LazyImport(() => import("./pages/components"), 0);
const ComponentPreview = LazyImport(
  () => import("./pages/components/fullscreen-preview"),
  0
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/theme" element={<ThemePage />} />
        <Route path="/components" element={<ComponentsSystem />} />
        <Route path="/components/installation" element={<ComponentsSystem />} />
        <Route path="/components/:componentId" element={<ComponentsSystem />} />
        <Route
          path="/components/:componentId/:variantId/preview"
          element={<ComponentPreview />}
        />
      </Routes>
    </BrowserRouter>
  );
}
