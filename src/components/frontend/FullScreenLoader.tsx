"use client";

import { LoaderPinwheel } from "lucide-react";

export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-gray-50/80">
      <LoaderPinwheel
        className="h-10 w-10 animate-spin text-gray-800"
        strokeWidth={2}
      />
    </div>
  );
}
export function FullScreenLoaderWithText({ text }: { text: string }) {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-gray-50/80">
      <LoaderPinwheel
        className="h-10 w-10 animate-spin text-gray-800"
        strokeWidth={2}
      />
      <p className="mt-4 text-gray-700">{text}</p>
    </div>
  );
}
