import { Navigate } from "react-router-dom";
import { usePermission } from "./src/permissionProvider";




export default function AdminRouter({ children }) {
  const { isLoggedIn, isAdmin, loading } = usePermission();

  if (loading) return null;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
