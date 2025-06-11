import React, { Suspense, useState, useEffect, ComponentType, FC } from "react";
import { Loader } from "../loader";

export type LazyImportProps = <P extends object>(
  importFunc: () => Promise<{ default: ComponentType<P> }>,
  name: string,
  delay?: number
) => FC<P>;

const LazyImport = <P extends object>(
  importFunc: () => Promise<{ default: ComponentType<P> }>,
  delay: number = 1000
): FC<P> => {
  const LazyComponent = React.lazy(importFunc);

  return function WithSuspense(props) {
    const [show, setShow] = useState(delay === 0);

    useEffect(() => {
      const startTime = Date.now();

      let delayTimer: ReturnType<typeof setTimeout> | null = null;
      let didTimeout = false;

      if (delay > 0) {
        delayTimer = setTimeout(() => {
          didTimeout = true;
          setShow(true);
        }, delay);
      }

      importFunc().then((module) => {
        const loadTime = Date.now() - startTime;

        const componentName =
          module.default.displayName ||
          module.default.name ||
          "AnonymousComponent";

        if (delay === 0 || loadTime >= delay) {
          if (!didTimeout) setShow(true);
          if (delayTimer) clearTimeout(delayTimer);
        }

        console.info(
          `[${componentName}] loaded in ${loadTime}ms — ${
            delay === 0
              ? "no manual delay"
              : loadTime >= delay
              ? "component was slow, shown immediately"
              : `extended delay to ${delay}ms`
          }`
        );
      });

      return () => {
        if (delayTimer) clearTimeout(delayTimer);
      };
    }, []);

    return (
      <Suspense fallback={<Loader loading />}>
        {show ? <LazyComponent {...props} /> : <Loader loading />}
      </Suspense>
    );
  };
};

export default LazyImport;
