// Input.tsx
import React from "react";

interface Props {
  label?: string;
  name: string;
  value: any;
  onChange: (e: any) => void;
  placeholder?: string;
  type?: string;
  error?: string;
}

const Input: React.FC<Props> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
}) => {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 
        ${error ? "border-red-500" : "focus:ring-blue-500"}`}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Input;