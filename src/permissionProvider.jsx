import { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";





const PermissionContext = createContext(null);

export function PermissionProvider({ children }) {
  const { user, loading } = useAuth();

  return (
    <PermissionContext.Provider
      value={{
        loading,
        isLoggedIn: !!user,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermission() {
  return useContext(PermissionContext);
}
