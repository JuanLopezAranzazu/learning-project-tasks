import { useLocation, Navigate, Outlet } from "react-router-dom";
// redux
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user);

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
