// Select.tsx
import React from "react";

interface Props {
  label?: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  options: { label: string; value: string }[];
}

const Select: React.FC<Props> = ({
  label,
  name,
  value,
  onChange,
  options,
}) => {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-lg"
      >
        <option value="">Select</option>

        {options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;