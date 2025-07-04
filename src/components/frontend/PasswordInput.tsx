"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface PasswordInputProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

export default function PasswordInput({
  label = "Password",
  value,
  onChange,
  name,
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          name={name}
          required
          className="w-full rounded-md border px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-300 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute top-2.5 right-3 text-gray-500"
          tabIndex={-1}
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
}
