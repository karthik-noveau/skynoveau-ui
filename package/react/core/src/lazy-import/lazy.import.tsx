import React, { Suspense, useState, useEffect, ComponentType, FC } from "react";
import { Loader } from "../loader";

export type LazyImportProps = <P extends object>(
  importFunc: () => Promise<{ default: ComponentType<P> }>,
  name: string,
  delay?: number
) => FC<P>;

const LazyImport: LazyImportProps = (importFunc, name, delay = 1000) => {
  const LazyComponent = React.lazy(importFunc);

  return function WithSuspense(props) {
    const [show, setShow] = useState(false);

    useEffect(() => {
      const startTime = Date.now();
      let didTimeout = false;

      const delayTimer = setTimeout(() => {
        didTimeout = true;
        setShow(true);
      }, delay);

      importFunc().then(() => {
        const endTime = Date.now();
        const loadTime = endTime - startTime;

        if (loadTime >= delay) {
          if (!didTimeout) {
            clearTimeout(delayTimer);
            setShow(true);
          }
        }

        console.info(
          `[${name}] loaded in ${loadTime}ms — ${
            loadTime >= delay
              ? "component was slow, shown immediately"
              : `extended delay to ${delay}ms`
          }`
        );
      });

      return () => clearTimeout(delayTimer);
    }, []);

    return (
      <Suspense fallback={<Loader loading />}>
        {show ? <LazyComponent {...props} /> : <Loader loading />}
      </Suspense>
    );
  };
};

export default LazyImport;
