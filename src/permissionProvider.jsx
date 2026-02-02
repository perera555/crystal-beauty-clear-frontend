import { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";


const PermissionContext = createContext(null);

export function PermissionProvider({ children }) {
  const { user, loading } = useAuth ();

  const value = {
    loading,
    isLoggedIn: Boolean(user),
    isAdmin: user?.role === "admin",
    isCustomer: user?.role === "user",
  };

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermission() {
  const context = useContext(PermissionContext);

  if (!context) {
    throw new Error("usePermission must be used inside PermissionProvider");
  }

  return context;
}
