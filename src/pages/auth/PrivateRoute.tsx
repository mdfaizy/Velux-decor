import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/slice/reduxHooks";

const PrivateRoute = ({ children }: any) => {
  const { token } = useAppSelector((state) => state.auth);

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;