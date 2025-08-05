"use client"

import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/auth/login");
  }, []);
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta
          name="description"
          content="Welcome to the home page of My Next.js App!"
        />
      </Head>
        <div className="mx-auto px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-20">
         
        </div>
    </>
  );
}
