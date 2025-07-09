"use client";

import { ProtectedRoute } from "@/app/user/components/ProtectedRole";
import FullScreenLoader from "@/components/frontend/FullScreenLoader";
import { useState } from "react";
import useSWR from "swr";
import LeaderTable from "./components/LeaderTable";

export default function LeaderDashboard() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");

  const { data, isLoading } = useSWR(
    `/v1/users?page=${page}&status=${status}&search=${search}`
  );

  if (isLoading || !data) {
    return <FullScreenLoader />;
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Leaders</h1>
        <LeaderTable
          leaders={data.data}
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
