import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/slice/reduxHooks";

const RoleRoute = ({ children, role }: any) => {
  const { token, user } = useAppSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RoleRoute;