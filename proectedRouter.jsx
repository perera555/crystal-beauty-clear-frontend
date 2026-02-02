import { Navigate,} from "react-router-dom";
import usePermission from "./permissonProvider"




export default function ProtectedRouter({ children }) {
  const { isLoggedIn } = usePermission();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
