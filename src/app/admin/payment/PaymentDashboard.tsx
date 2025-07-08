"use client";

import { ProtectedRoute } from "@/app/user/components/ProtectedRole";
import FullScreenLoader from "@/components/frontend/FullScreenLoader";
import { useState } from "react";
import useSWR from "swr";
import PaymentTable from "./components/paymentTable";

export default function PaymentDashboard() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("waiting_verification");
  const { data, isLoading } = useSWR(
    `/v1/payments?page=${page}&status=${status}&search=${search}`
  );

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Payment</h1>
        <PaymentTable
          payments={data?.data || []}
          key={data?.data?.id || []}
          meta={data.meta}
          onPageChange={setPage}
          onStatusFilter={setStatus}
          onSearch={setSearch}
        />
      </div>
    </ProtectedRoute>
  );
}
