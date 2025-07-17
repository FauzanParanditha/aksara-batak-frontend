"use client";

import { ProtectedRoute } from "@/app/user/components/ProtectedRole";
import FullScreenLoader from "@/components/frontend/FullScreenLoader";
import { useState } from "react";
import useSWR from "swr";
import TeamMemberTable from "./components/TeamMemberTable";

export default function TeamMemberDashboard() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useSWR(
    `/v1/team-members?page=${page}&search=${search}`
  );

  if (isLoading || !data) {
    return <FullScreenLoader />;
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Team Members</h1>
        <TeamMemberTable
          teamMembers={data?.data}
          key={data?.data?.id}
          meta={data?.meta}
          onPageChange={setPage}
          onSearch={setSearch}
        />
      </div>
    </ProtectedRoute>
  );
}
