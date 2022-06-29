import { useLocation, Navigate, Outlet } from "react-router-dom"

export const Guard = ({ isAuthenticated, routeRedirect }) => {
  const location = useLocation();

  return isAuthenticated
    ? <Outlet />
    : <Navigate to={routeRedirect} replace state={{ from: location }} />
};