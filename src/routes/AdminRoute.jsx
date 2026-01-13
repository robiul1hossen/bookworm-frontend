import { Loader } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading, logout } = useAuth();

  if (loading) return <Loader />;

  if (!user || user.role !== "admin") {
    logout();
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default AdminRoute;
