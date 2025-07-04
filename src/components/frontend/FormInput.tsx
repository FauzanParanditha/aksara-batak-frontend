"use client";

import clsx from "clsx";

interface FormInputProps {
  label?: string;
  type?: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  readOnly?: boolean;
}

export default function FormInput({
  label,
  type = "text",
  value,
  onChange,
  name,
  placeholder,
  required,
  className,
  readOnly,
}: FormInputProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-xs text-red-800">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={clsx(
          className,
          "w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none",
        )}
        readOnly={readOnly}
      />
    </div>
  );
}
