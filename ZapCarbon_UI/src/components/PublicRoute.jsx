import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";

export default function PublicRoute() {
  const {isAuthenticated, loading} = useAuth();
 

  if (loading) return <Loader/>;

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
}
