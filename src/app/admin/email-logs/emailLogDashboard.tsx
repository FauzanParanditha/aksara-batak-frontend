"use client";

import { ProtectedRoute } from "@/app/user/components/ProtectedRole";
import FullScreenLoader from "@/components/frontend/FullScreenLoader";
import { useState } from "react";
import useSWR from "swr";
import EmailLogTable from "./components/EmailLogTable";

export default function EmailLogDashboard() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");

  const { data, isLoading } = useSWR(
    `/v1/email-logs?page=${page}&status=${status}&search=${search}`
  );

  if (isLoading || !data) {
    return <FullScreenLoader />;
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Email Logs</h1>
        <EmailLogTable
          emailLogs={data.data}
          key={data.data.id}
          meta={data.meta}
          onPageChange={setPage}
          onStatusFilter={setStatus}
          onSearch={setSearch}
        />
      </div>
    </ProtectedRoute>
  );
}
