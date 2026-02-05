import { Navigate, useLocation } from "react-router-dom";
import { usePermission } from "./src/permissionProvider";




export default function ProtectedRouter({ children }) {
  const { isLoggedIn, loading } = usePermission();
  const location = useLocation();

  // ⏳ wait for permission check
  if (loading) {
    return null;
  }

  // 🔒 block unauthenticated
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
