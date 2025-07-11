"use client";

import FullScreenLoader from "@/components/frontend/FullScreenLoader";
import { useState } from "react";
import useSWR from "swr";
import { ProtectedRoute } from "../components/ProtectedRole";
import PaymentTable from "./components/paymentTable";

export default function PaymentDashboard() {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useSWR(`/v1/payments?&search=${search}`);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <ProtectedRoute allowedRoles={["leader"]}>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Payment</h1>
        <PaymentTable
          payments={data || []}
          key={data?.id || []}
          onSearch={setSearch}
        />
      </div>
    </ProtectedRoute>
  );
}
