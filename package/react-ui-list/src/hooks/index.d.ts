// hooks/index.d.ts
export declare const useScrollToTop: () => void;

export declare const useAosApply: (isLoader: boolean) => void;

interface UseDomHeightOptions {
  type?: "hover" | "click";
  selector: string;
}

interface UseDomHeightReturn {
  domHeight: number;
  handleMouseEnter: (e: React.MouseEvent<HTMLElement>) => void;
  handleMouseLeave: (e: React.MouseEvent<HTMLElement>) => void;
  handleClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export declare const useDomHeight: (
  options: UseDomHeightOptions
) => UseDomHeightReturn;

export declare const useWindowWidth: () => number;

export declare const useDebounce: <T extends (...args: any[]) => void>(
  func: T,
  delay?: number
) => (...args: Parameters<T>) => void;
