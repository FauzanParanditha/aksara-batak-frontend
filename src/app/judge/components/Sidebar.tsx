"use client";

import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Home, LogOut, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/judge/dashboard", label: "Dashboard", icon: <Home size={18} /> },
  { href: "/judge/team", label: "Teams", icon: <User size={18} /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Toggle Button (Mobile) */}
      <div className="md:hidden p-4">
        <button onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white transform transition-transform duration-300 ease-in-out
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        {/* Close button (mobile only) */}
        <div className="flex items-center justify-between p-4 md:hidden">
          <h2 className="text-xl font-bold text-blue-700">Judge Panel</h2>
          <button onClick={toggleSidebar}>
            <X size={20} />
          </button>
        </div>

        {/* Title (desktop only) */}
        <h2 className="hidden md:block text-xl font-bold text-blue-700 px-4 pt-4">
          Judge Panel
        </h2>

        <nav className="flex flex-col space-y-2 p-4">
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

        <div className="px-4 mt-4">
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-red-500 hover:underline"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
