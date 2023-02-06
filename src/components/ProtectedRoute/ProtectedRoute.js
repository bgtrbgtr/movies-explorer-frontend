import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ user, redirectPath = "/" }) {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
