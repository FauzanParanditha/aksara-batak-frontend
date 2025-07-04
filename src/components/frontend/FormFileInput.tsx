"use client";

import clsx from "clsx";

interface FormFileInputProps {
  label?: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  required?: boolean;
  className?: string;
}

export default function FormFileInput({
  label,
  name,
  onChange,
  accept = ".pdf,.ppt,.pptx,.doc,.docx,image/*",
  required,
  className,
}: FormFileInputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-xs text-red-800">*</span>}
        </label>
      )}
      <input
        type="file"
        name={name}
        accept={accept}
        onChange={onChange}
        required={required}
        className={clsx(
          className,
          "w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
        )}
      />
    </div>
  );
}
