"use client";

import { ProtectedRoute } from "@/app/user/components/ProtectedRole";
import FullScreenLoader from "@/components/frontend/FullScreenLoader";
import { useState } from "react";
import useSWR from "swr";
import TeamTable from "./components/TeamTable";

export default function TeamDashboard() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useSWR(`/v1/teams?page${page}&search=${search}`);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Teams</h1>
        <TeamTable
          teams={data?.data}
          key={data?.id}
          meta={data?.meta}
          onPageChange={setPage}
          onSearch={setSearch}
        />
      </div>
    </ProtectedRoute>
  );
}
