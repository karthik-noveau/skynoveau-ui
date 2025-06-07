import React, { Suspense, useRef } from "react";

export const SuspenseLazyLoader = (importFunc, name, delay = 1000) => {
  return function WithSuspense(props) {
    const ref = useRef({ loading: true });

    const LazyComponent = React.lazy(async () => {
      const startTime = Date.now();
      const module = await importFunc();
      const endTime = Date.now();
      const loadTime = endTime - startTime;

      const remainingTime = loadTime < delay ? delay - loadTime : 0;
      let extendDelay =
        remainingTime <= 50 ? delay - remainingTime : remainingTime;

      setTimeout(() => {
        ref.current.loading = false;
      }, extendDelay - 10);

      await new Promise((resolve) => setTimeout(resolve, extendDelay));

      console.info(
        `${name}lazy component loaded ${loadTime}ms - remain ${remainingTime}ms at ${delay}ms`
      );
      ref.current.loading = true;
      console.info("-----------------------------------------");

      return module;
    });

    return (
      <Suspense fallback={<Loader loading={ref.current.loading} />} ref={ref}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
};
