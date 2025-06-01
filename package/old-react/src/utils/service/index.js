import axios from "axios";

export const serviceRequest = ({
  localhost,
  production,
  isProduction = false,
}) => {
  let BASE_URL;

  if (process.env.NODE_ENV === "production") {
    BASE_URL = production;
  } else if (process.env.NODE_ENV === "development" && isProduction) {
    BASE_URL = production;
  } else {
    BASE_URL = localhost;
  }

  return {
    get: async ({ baseURL = BASE_URL, url, payload, query }) => {
      try {
        const URL = `${baseURL}${url}${queryParams(query)}`;
        return (await axios.get(URL, payload)).data;
      } catch (error) {
        handleError(error);
      }
    },

    post: async ({ baseURL = BASE_URL, url, payload, query }) => {
      try {
        const URL = `${baseURL}${url}${queryParams(query)}`;
        return (await axios.post(URL, payload)).data;
      } catch (error) {
        handleError(error);
      }
    },

    put: async ({ baseURL = BASE_URL, url, payload, query }) => {
      try {
        const URL = `${baseURL}${url}${queryParams(query)}`;
        return (await axios.put(URL, payload)).data;
      } catch (error) {
        handleError(error);
      }
    },

    delete: async ({ baseURL = BASE_URL, url, payload, query }) => {
      try {
        const URL = `${baseURL}${url}${queryParams(query)}`;
        return (await axios.delete(URL, payload)).data;
      } catch (error) {
        handleError(error);
      }
    },
  };
};

const queryParams = (params) => {
  const query = Object.entries(params || {})
    .filter(([_, value]) => {
      if (Array.isArray(value)) {
        return value.length !== 0;
      }
      return value !== undefined && value !== null && value !== "";
    })
    .flatMap(([key, value]) => {
      if (Array.isArray(value)) {
        return new URLSearchParams({
          [key]: value,
        }).toString();
      } else {
        return `${key}=${encodeURIComponent(value)}`;
      }
    })
    .join("&");

  return query ? `?${query}` : "";
};

const handleError = (error) => {
  const message =
    error.response?.data?.error?.errorResponse?.errmsg ||
    error.response?.data?.message ||
    error.message ||
    "Error in API";
  throw new Error(message);
};
