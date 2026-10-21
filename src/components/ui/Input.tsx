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
      {label && <label className="text-sm font-medium text-[#5C4033]">{label}</label>}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 border rounded-lg outline-none bg-[#FDFAF6] text-[#3D2B1F]
        transition focus:bg-white focus:ring-2
        ${error ? "border-red-500" : "border-[#E0D8CC] focus:border-[#C9A84C] focus:ring-[#C9A84C]/25"}`}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Input;