// Button.tsx
import React from "react";

const Button = ({ children, loading, ...props }: any) => {
  return (
    <button
      {...props}
      className={`w-full py-2 rounded-lg text-white ${
        loading
          ? "bg-gray-400"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default Button;