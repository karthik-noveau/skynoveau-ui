import { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const AppProvider = ({ children, reactQuery = false }) => {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <BrowserRouter>
      {reactQuery ? (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ) : (
        children
      )}
    </BrowserRouter>
  );
};
