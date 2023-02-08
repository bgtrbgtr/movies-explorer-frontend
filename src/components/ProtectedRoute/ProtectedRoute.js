import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ redirectPath = "/" }) {
  const user = localStorage.getItem("jwt");

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
