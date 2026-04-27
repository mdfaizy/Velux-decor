import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPasswordApi } from "../../services/authService";
import { toast } from "react-toastify";
import { Lock, Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // 🔥 handle input change
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 handle reset
  const handleReset = async () => {
    // ✅ validation
    if (!form.password || !form.confirmPassword) {
      return toast.error("All fields are required");
    }

    if (form.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      await resetPasswordApi(token!, form.password);

      toast.success("Password reset successful ✅");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err: any) {
      const message =
        err.response?.data?.message || "Something went wrong";

      // 🔥 better message handling
      if (message.includes("expired")) {
        toast.error("Link expired. Please request again.");
      } else {
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 px-4">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        {/* 🔥 Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Reset Password
        </h2>

        {/* 🔥 Password */}
        <div className="relative mb-4">
          <Lock className="absolute left-3 top-3 text-gray-400" size={18} />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="New Password"
            value={form.password}
            onChange={handleChange}
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

        {/* 🔥 Confirm Password */}
        <div className="relative mb-6">
          <Lock className="absolute left-3 top-3 text-gray-400" size={18} />

          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-3"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* 🔥 Button */}
        <button
          onClick={handleReset}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        {/* 🔥 Back to login */}
        <p className="text-center text-sm mt-4">
          Back to{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer font-medium"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default ResetPassword;