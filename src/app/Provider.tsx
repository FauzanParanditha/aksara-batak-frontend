"use client";

import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";
import { swrFetcher } from "@/lib/fetcher/swrFetcher";
import "react-toastify/dist/ReactToastify.css";
import { SWRConfig } from "swr";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: swrFetcher,
        revalidateOnFocus: true,
        shouldRetryOnError: true,
        refreshInterval: 0,
        onError: (err) => {
          console.error("[SWR Error]", err.message);
        },
      }}
    >
      <AuthProvider>
        <Toaster />
        {children}
      </AuthProvider>
    </SWRConfig>
  );
}
