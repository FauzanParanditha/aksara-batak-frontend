"use client";

import { ProtectedRoute } from "@/app/user/components/ProtectedRole";
import * as Tabs from "@radix-ui/react-tabs";
import { Lock, User } from "lucide-react";
import AccountForm from "./components/AccountForm";
import PasswordForm from "./components/PasswordForm";

export default function SettingsPage() {
  return (
    <ProtectedRoute allowedRoles={["leader"]}>
      <main className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <Tabs.Root defaultValue="account" className="w-full">
          <Tabs.List className="flex border-b mb-4 space-x-4">
            <Tabs.Trigger
              value="account"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
            >
              <User size={16} /> Account
            </Tabs.Trigger>
            <Tabs.Trigger
              value="password"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
            >
              <Lock size={16} /> Change Password
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="account">
            <AccountForm />
          </Tabs.Content>
          <Tabs.Content value="password">
            <PasswordForm />
          </Tabs.Content>
        </Tabs.Root>
      </main>
    </ProtectedRoute>
  );
}
