export const extractId = (data) => {
  return data.replaceAll(" ", "-").toLowerCase();
};

export const debounce = (func, delay = 500) => {
  let timeoutId;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(), delay);
  };
};

export const hasData = (value) => {
  let isData = false;
  if (typeof value === "object") {
    isData = Object.keys(value).length > 0;
  } else if (Array.isArray(value)) {
    isData = value.length > 0;
  } else {
    isData = value !== null && value !== undefined && value !== "";
  }

  return isData;
};

export const stringToId = (data) => {
  return data.toLowerCase().replaceAll(" ", "-");
};

export const startApiLoading = ({ setLoading }) => {
  const startTime = Date.now();
  setLoading(true);

  return startTime;
};

export const endApiLoading = ({ startTime, delay = 0.5, setLoading }) => {
  const elapsedTime = (Date.now() - startTime) / 1000;
  const remainingTime = Math.max(delay - elapsedTime, 0);

  if (remainingTime > 0) {
    setTimeout(() => {
      setLoading(false);
    }, remainingTime * 1000);
  } else {
    setLoading(false);
  }
};

export const copyToClipboard = ({ text }) => {
  let res = null;
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Text copied to clipboard!");
      return res;
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
};

export const formatDbDate = (UTCDate) => {
  const date = new Date(UTCDate);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  const hours24 = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  // Convert to 12-hour format
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 || 12; // Convert 0 to 12 for midnight

  // Format: 22 December 2024
  const compactDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedDate = `${day}/${month}/${year}`;
  const time = `${String(hours12).padStart(
    2,
    "0"
  )}:${minutes}:${seconds} ${period}`;

  return {
    day,
    month,
    year,

    time, // hh:mm:ss pm,

    date: formattedDate, // dd/mm/yyyy
    dateTime: `${formattedDate} ${time}`, // dd/mm/yyyy hh:mm:ss pm,
    compactDate: compactDate, // 01 Jan 2025
    compactDateTime: `${compactDate} ${time}`, // 01 Jan 2025 hh:mm:ss pm,
  };
};

export const formatDate = () => {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are 0-based
  const year = date.getFullYear();

  // Convert to 12-hour format
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // Convert 0 hour to 12 for 12-hour format
  const time = `${hours}:${minutes}:${seconds} ${ampm}`;

  return {
    day,
    month,
    year,

    time,
  };
};

export const MONTH_LIST = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
