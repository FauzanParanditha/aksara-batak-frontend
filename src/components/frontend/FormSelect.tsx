"use client";

import clsx from "clsx";

interface Option {
  label: string;
  value: string;
}

interface FormSelectProps {
  label?: string;
  name?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  required,
  className,
  disabled,
}: FormSelectProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-xs text-red-800">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={clsx(
          className,
          "w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
        )}
      >
        <option value="">-- Select --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
