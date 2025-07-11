"use client";

import FormInput from "@/components/frontend/FormInput";
import FormSelect from "@/components/frontend/FormSelect";
import FullScreenLoader from "@/components/frontend/FullScreenLoader";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";

interface PaymentFormProps {
  onSubmit: (data: { status: string; notes: string }) => void;
  onClose: () => void;
}

export default function PaymentForm({ onClose, onSubmit }: PaymentFormProps) {
  const { data, isLoading } = useSWR(`/v1/teams`);

  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("paid");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ status, notes });
  };

  if (!data || isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Notes"
            type="text"
            placeholder="Tulis catatan opsional..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            required
          />

          <FormSelect
            label="Status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={[
              { label: "Paid", value: "paid" },
              { label: "Reject", value: "rejected" },
            ]}
            required
          />

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Upload className="w-4 h-4 mr-2" /> Submit Verifikasi Pembayaran
          </Button>
        </form>
      </div>
    </div>
  );
}
