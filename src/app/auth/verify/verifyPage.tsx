"use client";

import FullScreenLoader from "@/components/frontend/FullScreenLoader";
import { toast } from "@/hooks/use-toast";
import clientAxios from "@/lib/axios/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("error");
        toast({ title: "Token tidak ditemukan." });
        setMessage("Token tidak ditemukan.");
        return;
      }

      try {
        const res = await clientAxios.get(`v1/auth/verify?token=${token}`);
        if (res.status !== 200) {
          toast({ title: "Gagal memverifikasi akun." });
          setMessage("Gagal memverifikasi akun.");
        }
        setStatus("success");
        setMessage("Akun berhasil diverifikasi.");
        router.push("/auth/login");
      } catch (err: any) {
        setStatus("error");
        setMessage(err.message);
      }
    };

    verify();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      {status === "loading" && <FullScreenLoader />}
      {status === "success" && (
        <p className="text-green-600 text-xl">{message}</p>
      )}
      {status === "error" && <p className="text-red-600 text-xl">{message}</p>}
    </div>
  );
}
