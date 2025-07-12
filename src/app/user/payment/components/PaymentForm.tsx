"use client";

import FormFileInput from "@/components/frontend/FormFileInput";
import FormInput from "@/components/frontend/FormInput";
import FullScreenLoader from "@/components/frontend/FullScreenLoader";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Upload, X } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";

interface PaymentFormProps {
  onSubmit: (data: FormData) => void;
  onClose: () => void;
}

export default function PaymentForm({ onClose, onSubmit }: PaymentFormProps) {
  const [file, setFile] = useState<File | null>(null);

  const { data, isLoading } = useSWR(`/v1/teams`);

  const handleSubmit = async () => {
    if (!file) return toast({ title: "Silakan upload bukti pembayaran." });

    const formData = new FormData();
    formData.append("teamId", data.id);
    formData.append("proof", file);
    onSubmit(formData);
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

        <div>
          <FormInput label="Team Name" value={data?.teamName} readOnly />
        </div>
        <div>
          <FormFileInput
            label="Photo"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <p className="text-xs text-gray-500 mt-1">
            Format file: PDF, JPG, atau PNG. Maksimal 2MB.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Harap pastikan bukti transfer mencantumkan:
          </p>
          <ul className="text-xs text-gray-500 list-disc list-inside">
            <li>Nama pengirim</li>
            <li>Nomor rekening pengirim</li>
            <li>Tanggal transfer</li>
            <li>Jumlah transfer</li>
            <li>Kode berita/keterangan jika diminta</li>
          </ul>
        </div>
        <Button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          <Upload className="w-4 h-4 mr-2" /> Upload Bukti Pembayaran
        </Button>
      </div>
    </div>
  );
}
