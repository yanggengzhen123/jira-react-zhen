/* <AppProviders> */
// <App />
// </AppProviders> 用于包裹<App />，传递context

import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
import { QueryClient, QueryClientProvider } from "react-query";
export const AppProviders = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    // @ts-ignore;
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>;
    </QueryClientProvider>
  );
};
