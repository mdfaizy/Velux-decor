import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { signupApi } from "../../services/authService";
import { useAppDispatch, useAppSelector } from "../../redux/slice/reduxHooks";
import { setLoading, setError } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "user",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // ✅ Validation
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      dispatch(setError("All fields are required"));
      return;
    }

    if (form.password !== form.confirmPassword) {
      dispatch(setError("Passwords do not match ❌"));
      return;
    }

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const res = await signupApi({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,    
      });

      console.log("Signup Success:", res);

      // ✅ success redirect
      alert("Signup Successful ✅");
      navigate("/login");

    } catch (err: any) {
      dispatch(
        setError(err.response?.data?.message || "Signup failed")
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
   <div className="min-h-screen flex bg-gray-100">

  {/* 🔥 LEFT SIDE (DESIGN / BANNER) */}
  <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 text-white items-center justify-center p-10">

    <div className="max-w-md text-center space-y-4">
      <h1 className="text-4xl text-gray-500 font-bold">
        Welcome to Admin Panel 
      </h1>

      <p className="text-lg  text-gray-500">
        Manage your products, categories, and users with ease.
      </p>

      <div className="mt-6">
        <img
          src="https://illustrations.popsy.co/gray/web-design.svg"
          alt="illustration"
          className="w-full"
        />
      </div>
    </div>

  </div>

  {/* 🔥 RIGHT SIDE (FORM) */}
  <div className="flex w-full lg:w-1/2 items-center justify-center p-6">

    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Create Account
      </h2>

      {/* FORM SAME RAHEGA */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name */}
        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Role Select */}
<div className="relative">
  <select
    name="role"
    value={form.role}
    onChange={handleChange}
    className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500"
  >
    <option value="user">User</option>
    <option value="admin">Admin</option>
    <option value="designer">Designer</option>
  </select>
</div>

        {/* Password */}
        {/* <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full pl-10 pr-10 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500"
          />
        </div>

     
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full pl-10 pr-10 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500"
          />
        </div> */}


        {/* PASSWORD */}
<div className="relative">
  <Lock className="absolute left-3 top-3 text-gray-400" size={18} />

  <input
    type={showPassword ? "text" : "password"}
    name="password"
    value={form.password}
    onChange={handleChange}
    placeholder="Password"
    className="w-full pl-10 pr-10 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500"
  />

  {/* 👁 Eye Icon */}
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-3 text-gray-400"
  >
    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>
</div>

{/* CONFIRM PASSWORD */}
<div className="relative">
  <Lock className="absolute left-3 top-3 text-gray-400" size={18} />

  <input
    type={showConfirm ? "text" : "password"}
    name="confirmPassword"
    value={form.confirmPassword}
    onChange={handleChange}
    placeholder="Confirm Password"
    className="w-full pl-10 pr-10 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500"
  />

  {/* 👁 Eye Icon */}
  <button
    type="button"
    onClick={() => setShowConfirm(!showConfirm)}
    className="absolute right-3 top-3 text-gray-400"
  >
    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>
</div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        {error && (
          <p className="text-red-500 text-sm text-center">
            {error}
          </p>
        )}
      </form>

    </div>
  </div>

</div>
  );
};

export default Signup;