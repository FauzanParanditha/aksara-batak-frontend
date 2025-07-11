"use client";

import { motion } from "framer-motion";
import { JSX } from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: JSX.Element;
}

export default function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <motion.div
      className="rounded-lg bg-white p-4 shadow"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <div className="text-sm text-gray-600">{title}</div>
      <div className="flex justify-between text-2xl font-bold text-blue-600">
        {value}
        {icon && <div className="ml-2 text-black">{icon}</div>}
      </div>
    </motion.div>
  );
}
