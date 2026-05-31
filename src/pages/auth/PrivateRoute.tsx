// import { Navigate } from "react-router-dom";
// import { useAppSelector } from "../../redux/slice/reduxHooks";

// const PrivateRoute = ({ children }: any) => {
//   const { token } = useAppSelector((state) => state.auth);

//   // return token ? children : <Navigate to="/login" />;
//   return token ? children : <Navigate to="/login" replace />;
// };

// export default PrivateRoute;

// import { Navigate, useParams } from "react-router-dom";
// import { useAppSelector } from "../../redux/slice/reduxHooks";

// // const PrivateRoute = ({ children }: any) => {
// //   const { token, user } = useAppSelector((state) => state.auth);
//   // const { role } = useParams();

//   // // ❌ not logged in
//   // if (!token) {
//   //   return <Navigate to="/login" replace />;
//   // }

//   // // ⏳ wait until user loads
//   // if (!user) {
//   //   return null; // or loader
//   // }

//   // // ❌ role mismatch
//   // if (role && user.role !== role) {
//   //   return <Navigate to={`/${user.role}`} replace />;
//   // }

//   // return children;
//   const PrivateRoute = ({ children }: any) => {
//   const { token } = useAppSelector((state) => state.auth);
//   console.log("TOKEN:", token);
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };


// export default PrivateRoute;



import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/slice/reduxHooks";

const PrivateRoute = ({ children }: any) => {
  const { token } = useAppSelector((state) => state.auth);

  const authToken =
    token || localStorage.getItem("token");

  console.log("REDUX TOKEN:", token);
  console.log(
    "LOCAL STORAGE TOKEN:",
    localStorage.getItem("token")
  );

  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;