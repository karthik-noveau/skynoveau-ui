import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LazyImport } from "@skynoveau-ui/core";

import "./styles.css";

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
        <Route path="/components/colors" element={<ComponentsSystem />} />
        <Route path="/components/shadows" element={<ComponentsSystem />} />

        <Route path="/components/:componentId" element={<ComponentsSystem />} />
        <Route
          path="/components/:componentId/:componentTypeId"
          element={<ComponentsSystem />}
        />
        <Route
          path="/components/:componentId/:variantId/preview"
          element={<ComponentPreview />}
        />
        <Route
          path="/components/:componentId/:componentTypeId/:variantId/preview"
          element={<ComponentPreview />}
        />
      </Routes>
    </BrowserRouter>
  );
}
