"use client";

import clsx from "clsx";

interface FormTextAreaProps {
  label?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  rows?: number;
  readOnly?: boolean;
}

export default function FormTextArea({
  label,
  value,
  onChange,
  name,
  placeholder,
  required,
  className,
  rows = 4,
  readOnly,
}: FormTextAreaProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-xs text-red-800">*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={clsx(
          className,
          "w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
        )}
        readOnly={readOnly}
      />
    </div>
  );
}
