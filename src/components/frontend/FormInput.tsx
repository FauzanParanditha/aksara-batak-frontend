"use client";

import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, type = "text", className, required, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-xs text-red-800">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            required={required}
            className={clsx(
              className,
              "w-full rounded-md border px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            )}
            {...rest}
          />

          {isPassword && (
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          )}
        </div>
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
export default FormInput;
