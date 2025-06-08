import { useEffect } from "react";

export type useScrollToTopProps = () => void;

const useScrollToTop: useScrollToTopProps = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};

export default useScrollToTop;
