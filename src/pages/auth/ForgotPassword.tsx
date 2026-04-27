import React, { useState } from "react";
import { forgotPasswordApi } from "../../services/authService";
import { Mail } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  // ⏳ cooldown timer
  const startCooldown = () => {
    let time = 30; // 30 sec
    setCooldown(time);

    const interval = setInterval(() => {
      time--;
      setCooldown(time);

      if (time <= 0) clearInterval(interval);
    }, 1000);
  };

  const handleSubmit = async () => {
    setError("");
    setMessage("");

    // ✅ validation
    if (!email) {
      setError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    try {
      setLoading(true);

      const res = await forgotPasswordApi(email);

      setMessage(res.message || "Reset link sent to your email");
      startCooldown(); // 🔥 prevent spam
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 px-4 mt-16">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

        <h2 className="text-2xl font-bold text-center mb-2">
          Forgot Password
        </h2>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Enter your email and we'll send you a reset link
        </p>

        {/* INPUT */}
        <div className="relative mb-4">
          <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full pl-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        {/* SUCCESS */}
        {message && (
          <p className="text-green-600 text-sm mb-3 text-center">
            {message}
          </p>
        )}

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading || cooldown > 0}
          className={`
            w-full py-3 rounded-lg font-semibold transition text-white
            ${
              loading || cooldown > 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }
          `}
        >
          {loading
            ? "Sending..."
            : cooldown > 0
            ? `Resend in ${cooldown}s`
            : "Send Reset Link"}
        </button>

        {/* FOOTER */}
        <p className="text-center text-sm mt-4">
          Remember your password?{" "}
          <span
            onClick={() => (window.location.href = "/login")}
            className="text-blue-600 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;