  // import React, { useState ,useEffect} from "react";
  // import { Mail, Lock, Eye, EyeOff } from "lucide-react";
  // import { useAppDispatch, useAppSelector } from "../../redux/slice/reduxHooks";
  // import { setUser, setToken, setLoading, setError } from "../../redux/slice/authSlice";
  // import { loginApi } from "../../services/authService";
  // import { useNavigate } from "react-router-dom";

  // const Login = () => {
  //   const dispatch = useAppDispatch();
  //   const navigate = useNavigate();
  // const { token, user, loading, error } = useAppSelector(
  //   (state) => state.auth
  // );
  //   const [showPassword, setShowPassword] = useState(false);

  //   const [form, setForm] = useState({
  //     email: "",
  //     password: "",
  //   });

  //   const handleChange = (e: any) => {
  //     setForm({ ...form, [e.target.name]: e.target.value });
  //   };

  //   useEffect(() => {
  //   if (token && user?.role) {
  //     navigate(`/${user.role}`);
  //   }
  // }, [token, user, navigate]);

  //   const handleSubmit = async (e: any) => {
  //     e.preventDefault();

  //     // ✅ Validation
  //     if (!form.email || !form.password) {
  //       dispatch(setError("All fields are required"));
  //       return;
  //     }

  //     try {
  //       dispatch(setLoading(true));
  //       dispatch(setError(null));
  //       const res = await loginApi(form);
  //       const userData = res.data.user;
  // console.log("LOGIN RESPONSE 👉", res);
  //       // 🔥 IMPORTANT (backend response structure)
  //       dispatch(setUser(res.data.user));
  //       dispatch(setToken(res.token));
  //       console.log("USER ROLE 👉", userData.role);
  //     const result = navigate("/user");
  // console.log(result); // 👉 undefined (normal)
  // // navigate(`/dashboard/${userData.role}`);
  //       // redirect
  //       // navigate("/dashboard");

  //     } catch (err: any) {
  //       dispatch(
  //         setError(err.response?.data?.message || "Login failed")
  //       );
  //     } finally {
  //       dispatch(setLoading(false));
  //     }
  //   };

  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-100">

  //       <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

  //         <h2 className="text-2xl font-bold text-center mb-6">
  //           Login
  //         </h2>

  //         <form onSubmit={handleSubmit} className="space-y-4">

  //           {/* EMAIL */}
  //           <div className="relative">
  //             <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
  //             <input
  //               type="email"
  //               name="email"
  //               placeholder="Email"
  //               onChange={handleChange}
  //               className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
  //             />
  //           </div>

  //           {/* PASSWORD */}
  //           <div className="relative">
  //             <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
  //             <input
  //               type={showPassword ? "text" : "password"}
  //               name="password"
  //               placeholder="Password"
  //               onChange={handleChange}
  //               className="w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
  //             />
  //             <button
  //               type="button"
  //               onClick={() => setShowPassword(!showPassword)}
  //               className="absolute right-3 top-3"
  //             >
  //               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  //             </button>
  //           </div>

  //           {/* BUTTON */}
  //           <button
  //             type="submit"
  //             disabled={loading}
  //             className={`
  //               w-full py-3 rounded-lg font-semibold transition
  //               ${
  //                 loading
  //                   ? "bg-gray-400 cursor-not-allowed"
  //                   : "bg-blue-600 hover:bg-blue-700"
  //               }
  //               text-white
  //             `}
  //           >
  //             {loading ? "Logging in..." : "Login"}
  //           </button>

  //           {/* ERROR */}
  //           {error && (
  //             <p className="text-red-500 text-sm text-center">
  //               {error}
  //             </p>
  //           )}
  //         </form>

  //         {/* FOOTER */}
  //         <p className="text-center text-sm mt-4">
  //           Don't have an account?{" "}
  //           <span
  //             onClick={() => navigate("/signup")}
  //             className="text-blue-600 cursor-pointer font-medium"
  //           >
  //             Signup
  //           </span>
  //         </p>

  //       </div>
  //     </div>
  //   );
  // };

  // export default Login;


  import React, { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux/slice/reduxHooks";
import { setUser, setToken, setLoading, setError } from "../../redux/slice/authSlice";
import { loginApi } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, user, loading, error } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (token && user?.role) {
      navigate(`/${user.role}`);
    }
  }, [token, user]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      dispatch(setError("All fields are required"));
      return;
    }

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const res = await loginApi(form);

      dispatch(setUser(res.data.user));
      dispatch(setToken(res.token));

      navigate(`/${res.data.user.role}`);
    } catch (err: any) {
      dispatch(setError(err.response?.data?.message || "Login failed"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="md:min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 md:mt-20">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

        <h2 className="text-3xl font-bold text-center mb-2">Welcome Back 👋</h2>
        <p className="text-center text-gray-500 mb-6">Login to your account</p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* EMAIL */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full pl-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* FORGOT PASSWORD */}
          <div className="text-right text-sm">
            <span
              onClick={() => navigate("/forgot-password")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Forgot Password?
            </span>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        </form>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 cursor-pointer"
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;