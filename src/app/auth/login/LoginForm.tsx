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
import {
  Code,
  Cpu,
  Database,
  Laptop,
  Microchip,
  Monitor,
  Terminal,
  Wifi,
  Zap,
} from "lucide-react";
import Image from "next/image";
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
    <div className="flex flex-col gap-5 min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4">
      <div className="">
        <Image
          src="/images/logo/logo.png"
          alt="Logo"
          width={420}
          height={420}
          className="object-contain transition-opacity duration-200"
        />
      </div>
      <title>Login | Page</title>
      <div className="absolute inset-0 pointer-events-none">
        {/* Code Icon */}
        <div
          className="absolute top-20 left-10 animate-float"
          style={{ animationDelay: "0s" }}
        >
          <Code className="w-8 h-8 text-purple-400/60" />
        </div>

        {/* Database Icon */}
        <div
          className="absolute top-32 right-20 animate-float"
          style={{ animationDelay: "1s" }}
        >
          <Database className="w-10 h-10 text-blue-400/60" />
        </div>

        {/* Zap Icon */}
        <div
          className="absolute top-1/4 left-1/4 animate-float"
          style={{ animationDelay: "2s" }}
        >
          <Zap className="w-6 h-6 text-yellow-400/60" />
        </div>

        {/* CPU Icon */}
        <div
          className="absolute top-1/3 right-1/3 animate-float"
          style={{ animationDelay: "0.5s" }}
        >
          <Cpu className="w-12 h-12 text-green-400/60" />
        </div>

        {/* Terminal Icon */}
        <div
          className="absolute bottom-1/4 left-16 animate-float"
          style={{ animationDelay: "1.5s" }}
        >
          <Terminal className="w-8 h-8 text-pink-400/60" />
        </div>

        {/* Monitor Icon */}
        <div
          className="absolute bottom-1/3 right-16 animate-float"
          style={{ animationDelay: "2.5s" }}
        >
          <Monitor className="w-10 h-10 text-cyan-400/60" />
        </div>

        {/* WiFi Icon */}
        <div
          className="absolute top-1/2 left-8 animate-float"
          style={{ animationDelay: "3s" }}
        >
          <Wifi className="w-7 h-7 text-indigo-400/60" />
        </div>

        {/* Microchip Icon */}
        <div
          className="absolute top-3/4 right-8 animate-float"
          style={{ animationDelay: "1.8s" }}
        >
          <Microchip className="w-9 h-9 text-orange-400/60" />
        </div>

        {/* Laptop Icon */}
        <div
          className="absolute bottom-20 left-1/3 animate-float"
          style={{ animationDelay: "2.2s" }}
        >
          <Laptop className="w-8 h-8 text-teal-400/60" />
        </div>

        {/* Computer Icon */}
        <div
          className="absolute top-16 right-1/4 animate-float"
          style={{ animationDelay: "0.8s" }}
        >
          <Code className="w-6 h-6 text-red-400/60" />
        </div>

        {/* Geometric Shapes */}
        <div
          className="absolute top-1/5 right-1/5 animate-float"
          style={{ animationDelay: "1.2s" }}
        >
          <div className="w-4 h-4 bg-purple-400/40 rounded-full"></div>
        </div>

        <div
          className="absolute bottom-1/5 left-1/5 animate-float"
          style={{ animationDelay: "2.8s" }}
        >
          <div className="w-3 h-3 bg-blue-400/40 rotate-45"></div>
        </div>

        <div
          className="absolute top-2/3 right-1/6 animate-float"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="w-2 h-8 bg-gradient-to-b from-pink-400/40 to-transparent rounded-full"></div>
        </div>
      </div>

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
