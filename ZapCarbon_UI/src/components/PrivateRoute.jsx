// src/layouts/ProtectedLayout.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";


export default function PrivateRoute() {
  const isAuthenticated = useAuth();
  const location = useLocation();

  if (isAuthenticated === null) {
  return (
    <Loader/>
  );
}
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}
