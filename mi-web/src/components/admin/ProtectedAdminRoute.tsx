import type { ReactNode } from "react";

import { useAdminAuth } from "../../context/AdminAuthContext";
import { AdminLoginCard } from "./AdminLoginCard";

export const ProtectedAdminRoute = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) {
    return <AdminLoginCard />;
  }

  return <>{children}</>;
};
