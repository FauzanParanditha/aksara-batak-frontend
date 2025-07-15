"use client";

import { ProtectedRoute } from "@/app/user/components/ProtectedRole";
import FullScreenLoader from "@/components/frontend/FullScreenLoader";
import { useState } from "react";
import useSWR from "swr";
import PaymentVerifiedLogTable from "./components/PaymentLogTable";

export default function PaymentLogDashboard() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("paid");
  const [search, setSearch] = useState("");

  const { data, isLoading } = useSWR(
    `/v1/verified-logs?page=${page}&status=${status}&search=${search}`
  );

  if (isLoading || !data) {
    return <FullScreenLoader />;
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Email Logs</h1>
        <PaymentVerifiedLogTable
          paymentVerifieds={data?.data}
          key={data?.data?.id}
          meta={data?.meta}
          onPageChange={setPage}
          onStatusFilter={setStatus}
          onSearch={setSearch}
        />
      </div>
    </ProtectedRoute>
  );
}
