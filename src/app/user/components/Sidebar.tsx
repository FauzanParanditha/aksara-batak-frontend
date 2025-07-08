"use client";

import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Home, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/user/dashboard", label: "Dashboard", icon: <Home size={18} /> },
  { href: "/user/team", label: "Team", icon: <User size={18} /> },
  // { href: "/user/payment", label: "Payment", icon: <CreditCard size={18} /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="h-screen w-64 space-y-6 border-r bg-white p-4 shadow-sm">
      <h2 className="text-xl font-bold text-blue-700">Leader Panel</h2>
      <nav className="flex flex-col space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} className="group relative">
              <div
                className={`flex items-center gap-3 rounded-md px-3 py-2 transition hover:bg-blue-50 ${
                  isActive
                    ? "bg-blue-100 font-semibold text-blue-700"
                    : "text-gray-700"
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </div>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 top-0 w-1 rounded-r bg-blue-600"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <button onClick={logout} className="text-sm text-red-500 hover:underline">
        <LogOut size={16} className="mr-1 inline" /> Logout
      </button>
    </aside>
  );
}
