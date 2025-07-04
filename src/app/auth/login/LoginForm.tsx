"use client";

import AnimatedCard from "@/components/frontend/AnimatedCard";
import FormInput from "@/components/frontend/FormInput";
import FullScreenLoader from "@/components/frontend/FullScreenLoader";
import PasswordInput from "@/components/frontend/PasswordInput";
import { useAuth } from "@/context/AuthContext";
import { useGuestRedirect } from "@/hooks/useGuestRedirects";
import { useHandleAxiosError } from "@/lib/handleError";
import { loginSchema } from "@/schemas/loginSchema";
import { loginForm } from "@/service/auth";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";

export const metadata = {
  title: "Login | Page",
};

export default function LoginFormPage() {
  useGuestRedirect();

  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleAxiosError = useHandleAxiosError();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      result.error.errors.forEach((err) => {
        toast.error(`${err.path[0]}: ${err.message}`);
      });
      setLoading(false);
      return;
    }
    try {
      const res = await loginForm(email, password);
      login(res.token);
      toast.success("Login berhasil!");
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4">
      <title>Login | Page</title>
      <AnimatedCard className="w-full max-w-md space-y-6">
        <motion.h2
          className="text-center text-3xl font-bold text-blue-700"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          Login Page
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-md bg-blue-600 py-2 text-white transition hover:bg-blue-700"
          >
            {loading ? <FullScreenLoader /> : "Login"}
          </button>
        </form>
      </AnimatedCard>
    </div>
  );
}
