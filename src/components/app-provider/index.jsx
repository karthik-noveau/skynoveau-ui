import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

export const AppProvider = ({ children }) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <>{children}</>
      </QueryClientProvider>
    </BrowserRouter>
  );
};
