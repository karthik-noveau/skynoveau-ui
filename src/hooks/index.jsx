import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AOS_ANIMATION } from "@components/aos-animation";

export const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};

export const useAosApply = (isLoader) => {
  useLayoutEffect(() => {
    const elements = document.querySelectorAll("#sui-aos");

    elements.forEach((element) => {
      element.setAttribute("data-aos", AOS_ANIMATION.FADE_UP.TYPE);
      element.setAttribute("data-aos-duration", AOS_ANIMATION.FADE_UP.DURATION);
      element.removeAttribute("sui-aos");
    });
  }, [isLoader]);
};

export const useDomHeight = ({ type = "hover", selector }) => {
  const [domHeight, setDomHeight] = useState(0);
  let handleMouseEnter = () => {};
  let handleMouseLeave = () => {};
  let handleClick = () => {};

  if (type === "hover") {
    handleMouseEnter = (e) => {
      const selectedElement = e.currentTarget.querySelector(selector);
      if (selectedElement) {
        const fullHeight = selectedElement.scrollHeight;
        setDomHeight(fullHeight);
      }
    };
    handleMouseLeave = () => {
      setDomHeight(0);
    };
  }

  if (type === "click") {
    handleClick = (e) => {
      const selectedElement = e.currentTarget.querySelector(selector);
      if (selectedElement) {
        const fullHeight = selectedElement.scrollHeight;
        setDomHeight(fullHeight);
      }
    };
  }

  return { domHeight, handleMouseEnter, handleMouseLeave, handleClick };
};

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth;
};

export default useWindowWidth;

export const useDebounce = (func, delay = 300) => {
  const timeoutRef = useRef(null);
  const funcRef = useRef(func);

  // Update funcRef when func changes
  useEffect(() => {
    funcRef.current = func;
  }, [func]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args) => {
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
