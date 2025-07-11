"use client";

import FormInput from "@/components/frontend/FormInput";
import { createUserSchema } from "@/schemas/leaderSchema";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

interface LeaderFormProps {
  initialData?: {
    id?: string;
    fullName: string;
    email: string;
    role: string;
    phone: string;
  };
  onSubmit: (data: {
    fullName: string;
    email: string;
    role: string;
    phone: string;
    password: string;
  }) => void;
  onClose: () => void;
}

export default function LeaderForm({
  initialData,
  onSubmit,
  onClose,
}: LeaderFormProps) {
  const [show, setShow] = useState(false);
  const [fullName, setFullName] = useState(initialData?.fullName || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [role, setRole] = useState(initialData?.role || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = createUserSchema.safeParse({
      fullName,
      email,
      role,
      phone,
      password,
    });

    if (!result.success) {
      result.error.errors.forEach((err) => {
        toast.error(`${err.path[0]}: ${err.message}`);
      });
      return;
    }

    const jsonBody = {
      fullName,
      email,
      role,
      phone,
      password,
    };
    onSubmit(jsonBody);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        <h2 className="mb-4 text-lg font-semibold">
          {initialData ? "Edit Leader" : "Add Leader"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <FormInput
              label="FullName"
              name="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div>
            <FormInput
              label="Email"
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <FormInput
              label="Role"
              name="role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>
          <div>
            <FormInput
              label="Phone"
              name="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <FormInput
              label="Password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
