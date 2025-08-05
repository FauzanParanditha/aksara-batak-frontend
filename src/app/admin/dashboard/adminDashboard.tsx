"use client";

import { ProtectedRoute } from "@/app/user/components/ProtectedRole";
import FullScreenLoader from "@/components/frontend/FullScreenLoader";
import { User } from "lucide-react";
import useSWR from "swr";
import StatCard from "./components/StatCard";

export default function AdminDashboard() {
  const { data, isLoading } = useSWR("/v1/dashboard/stats/admin");

  if (isLoading || !data) {
    return <FullScreenLoader />;
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Total Teams"
            value={data?.totalTeams}
            icon={<User />}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
