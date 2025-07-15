"use client";

import FullScreenLoader from "@/components/frontend/FullScreenLoader";
import { Users } from "lucide-react";
import useSWR from "swr";
import { ProtectedRoute } from "../components/ProtectedRole";
import StatCard from "./components/StatCard";

export default function UserDashboard() {
  const { data, isLoading } = useSWR("/v1/dashboard/stats");

  if (isLoading || !data) {
    return <FullScreenLoader />;
  }

  return (
    <ProtectedRoute allowedRoles={["leader"]}>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Members"
            value={data?.totalMembers}
            icon={<Users />}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
