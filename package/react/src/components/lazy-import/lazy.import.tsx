import React, {
  Suspense,
  useRef,
  type ComponentType,
  type LazyExoticComponent,
} from "react";
import { Loader } from "../loader";

export function LazyImport<T extends object>(
  importFunc: () => Promise<{ default: ComponentType<T> }>,
  name: string,
  delay = 1000
): ComponentType<T> {
  const LazyComponent: LazyExoticComponent<ComponentType<T>> = React.lazy(
    async () => {
      const startTime = Date.now();
      const module = await importFunc();
      const endTime = Date.now();
      const loadTime = endTime - startTime;

      const remainingTime = loadTime < delay ? delay - loadTime : 0;
      const extendDelay =
        remainingTime <= 50 ? delay - remainingTime : remainingTime;

      await new Promise((resolve) => setTimeout(resolve, extendDelay));

      console.info(
        `[LazyImport: ${name}] Load time: ${loadTime}ms, Remaining delay: ${remainingTime}ms, Total delay: ${delay}ms`
      );
      console.info("-----------------------------------------");

      return module;
    }
  );

  const WithSuspense: React.FC<T> = (props) => {
    const ref = useRef({ loading: true });

    return (
      <Suspense fallback={<Loader loading={ref.current.loading} />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };

  return WithSuspense;
}

export default LazyImport;