import React, { useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

import { useUiBuilderStore } from "./store/ui.builder.store";

import "./styles.css";
import "./theme.css";

// --------- Lazy-loaded components ----------
const Home = LazyImport(React.lazy(() => import("./pages/home")));
const ComponentsSystem = LazyImport(
  React.lazy(() => import("./pages/components-system"))
);
const ComponentPreview = LazyImport(
  React.lazy(() => import("./pages/component-preview"))
);
const ThemePreview = LazyImport(
  React.lazy(() => import("./pages/theme-preview"))
);
export default function App() {
  const { changeFontFamily } = useUiBuilderStore(
    useShallow((state) => ({
      changeFontFamily: state.changeFontFamily,
    }))
  );

  const styles = useMemo(() => {
    if (changeFontFamily) {
      return {
        "--text-font-family": "var(--text-font-family)",
        "--title-font-family": "var(--title-font-family)",
      };
    } else {
      return {
        "--text-font-family": "poppins",
        "--title-font-family": "poppins",
      };
    }
  }, [changeFontFamily]);

  return (
    <>
      <div className="sui" style={{ ...styles }}>
        {/* ---------- routes ---------- */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/components" element={<ComponentsSystem />} />
          <Route path="/theme-preview" element={<ThemePreview />} />
          <Route path="/components/:id" element={<ComponentsSystem />} />
          <Route
            path="/components/:componentId/:variantId/preview"
            element={<ComponentPreview />}
          />
        </Routes>
      </div>
    </>
  );
}
