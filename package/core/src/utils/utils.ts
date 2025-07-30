import React, { useCallback, useEffect, useRef } from "react";

export interface UseScrollToTopProps {
  dep?: React.DependencyList;
}

export const useScrollToTop = ({ dep = [] }: UseScrollToTopProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, dep);
};

export interface UseDebounceProps<T extends (...args: any[]) => void> {
  func: T;
  delay?: number;
}

export const useDebounce = <T extends (...args: any[]) => void>({
  func,
  delay = 300,
}: UseDebounceProps<T>): ((...args: Parameters<T>) => void) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const funcRef = useRef<T>(func);

  useEffect(() => {
    funcRef.current = func;
  }, [func]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        funcRef.current(...args);
      }, delay);
    },
    [delay]
  );
};
