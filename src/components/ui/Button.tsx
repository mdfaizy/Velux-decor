// Button.tsx
import React from "react";

const Button = ({ children, loading, className = "", disabled, ...props }: any) => {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`w-full py-2.5 px-5 rounded-lg font-semibold tracking-wide text-white
        transition-all duration-200
        ${
          loading || disabled
            ? "bg-[#C8BBA8] cursor-not-allowed"
            : "bg-gradient-to-br from-[#C9A84C] to-[#8B6914] shadow-[0_6px_18px_rgba(201,168,76,0.28)] hover:-translate-y-[1px] hover:shadow-[0_10px_24px_rgba(201,168,76,0.38)]"
        } ${className}`}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default Button;
