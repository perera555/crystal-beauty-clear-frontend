import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { usePermission } from "./src/permissionProvider";


export default function AdminRouter({ children }) {
  const { isLoggedIn, isAdmin, loading } = usePermission();
  const location = useLocation();

  useEffect(() => {
    if (!loading && (!isLoggedIn || !isAdmin)) {
      toast.error("Please login as admin");
    }
  }, [loading, isLoggedIn, isAdmin]);

  if (loading) return null;

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
