// // import { Navigate } from "react-router-dom";
// // import { useAppSelector } from "../../redux/slice/reduxHooks";

// // const OpenRoute = ({ children }: any) => {
// //   const { token } = useAppSelector((state) => state.auth);

// //   return token ? <Navigate to="/dashboard/overview" /> : children;
// // };

// // export default OpenRoute;

// import { Navigate } from "react-router-dom";
// import { useAppSelector } from "../../redux/slice/reduxHooks";

// const OpenRoute = ({ children }: any) => {
//   const { token } = useAppSelector((state) => state.auth);

//   // 🔥 agar login hai → dashboard bhejo
//   if (token) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   // 🔓 agar login nahi hai → page dikhao
//   return children;
// };

// export default OpenRoute;


// import { Navigate } from "react-router-dom";
// import { useAppSelector } from "../../redux/slice/reduxHooks";

// const OpenRoute = ({ children }: any) => {
//   const { token, user } = useAppSelector((state) => state.auth);

//   // 🔥 FIX: correct redirect with role
//   if (token && user?.role) {
//     return <Navigate to={`/${user.role}`} replace />;
//   }

//   return children;
// };

// const OpenRoute = ({ children }: any) => {
//   const { token, user } = useAppSelector((state) => state.auth);

//   if (token && user?.role) {
//     return <Navigate to={`/${user.role}`} replace />;
//   }

//   return children;
// };

// const OpenRoute = ({ children }: any) => {
//   const { token, user } = useAppSelector((state) => state.auth);

//   if (token && user?.role) {
//     if (user.role === "user") {
//       return <Navigate to="/profile" replace />;
//     } else {
//       return <Navigate to="/dashboard" replace />;
//     }
//   }

//   return children;
// };

// export default OpenRoute;


import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/slice/reduxHooks";

const OpenRoute = ({ children }: any) => {
  const { token, user } = useAppSelector((state) => state.auth);

  // only redirect on auth pages
  if (token && user?.role) {

    if (user.role === "user") {
      return <Navigate to="/profile" replace />;
    }

    if (
      user.role === "admin" ||
      user.role === "designer"
    ) {
      return <Navigate to="/dashboard/overview" replace />;
    }
  }

  return children;
};

export default OpenRoute;