import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/slice/reduxHooks";

const OpenRoute = ({ children }: any) => {
  const { token } = useAppSelector((state) => state.auth);

  return token ? <Navigate to="/dashboard/overview" /> : children;
};

export default OpenRoute;