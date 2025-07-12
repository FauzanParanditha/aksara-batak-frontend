"use client";

import FullScreenLoader from "@/components/frontend/FullScreenLoader";
import { useState } from "react";
import useSWR from "swr";
import { ProtectedRoute } from "../components/ProtectedRole";
import TeamTable from "./components/TeamTable";

export default function TeamDashboard() {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useSWR(`/v1/teams?&search=${search}`);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <ProtectedRoute allowedRoles={["leader"]}>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Team</h1>
        <TeamTable team={data} key={data?.id} onSearch={setSearch} />
      </div>
    </ProtectedRoute>
  );
}
