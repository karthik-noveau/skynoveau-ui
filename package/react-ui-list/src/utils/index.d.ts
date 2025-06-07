export declare const extractId: (data: string) => string;

export declare const debounce: (func: () => void, delay?: number) => () => void;

export declare const hasData: (value: any) => boolean;

export declare const stringToId: (data: string) => string;

interface StartApiLoadingOptions {
  setLoading: (val: boolean) => void;
}

export declare const startApiLoading: (
  options: StartApiLoadingOptions
) => number;

interface EndApiLoadingOptions {
  startTime: number;
  delay?: number;
  setLoading: (val: boolean) => void;
}

export declare const endApiLoading: (options: EndApiLoadingOptions) => void;

interface CopyToClipboardOptions {
  text: string;
}

export declare const copyToClipboard: (options: CopyToClipboardOptions) => void;

interface FormattedDbDate {
  day: string;
  month: string;
  year: number;
  time: string;
  date: string;
  dateTime: string;
  compactDate: string;
  compactDateTime: string;
}

export declare const formatDbDate: (
  UTCDate: string | number | Date
) => FormattedDbDate;

interface FormattedDate {
  day: number;
  month: number;
  year: number;
  time: string;
}

export declare const formatDate: () => FormattedDate;

export declare const MONTH_LIST: string[];

// If AOS_ANIMATION needs to be exported from this file, include it like below:
// export { AOS_ANIMATION } from "../constants";
