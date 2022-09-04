/* <AppProviders> */
// <App />
// </AppProviders> 用于包裹<App />，传递context

import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
