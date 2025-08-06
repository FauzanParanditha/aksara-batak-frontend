"use client";

import Hero from "@/components/Hero";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    // router.push("/auth/login");
  }, []);
  return (
    <div className="min-h-screen bg-white relative">
      <Hero />
    </div>
  );
}
