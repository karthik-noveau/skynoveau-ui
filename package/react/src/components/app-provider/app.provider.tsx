import { type ReactNode, useMemo } from "react";

import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface AppProviderProps {
  children: ReactNode;
  reactQuery?: boolean;
}

export const AppProvider = ({
  children,
  reactQuery = false,
}: AppProviderProps) => {
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

export default AppProvider;
