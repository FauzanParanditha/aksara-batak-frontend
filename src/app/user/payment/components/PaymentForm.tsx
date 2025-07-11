"use client";

import FormFileInput from "@/components/frontend/FormFileInput";
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
  const [vaNumber] = useState("2918887771");
  const [amount] = useState(200000);
  const [vaName] = useState("PENGELOLA NAMA DOMAIN INTERNET INDONESIA");
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
        {/* <CardHeader className="flex flex-col items-start gap-2">
            <CardTitle className="text-xl">Pembayaran Manual</CardTitle>
            <div className="flex items-center gap-3">
              <Image
                src="/images/bank/bca.png"
                alt="Bank BCA"
                width={48}
                height={48}
              />
              <div>
                <p className="font-medium text-sm">
                  Transfer ke rekening virtual Bank BCA
                </p>
                <p className="text-sm text-gray-500">
                  Silakan lakukan pembayaran ke nomor VA berikut dan upload
                  bukti pembayaran untuk verifikasi.
                </p>
              </div>
            </div>
          </CardHeader> */}
        {/* <div>
              <Label>Nomor Virtual Account (VA)</Label>
              <Input
                value={vaNumber}
                readOnly
                className="bg-gray-100 font-mono cursor-not-allowed"
              />
            </div>
            <div>
              <Label>Jumlah Pembayaran</Label>
              <Input
                value={`Rp ${amount.toLocaleString()}`}
                readOnly
                className="bg-gray-100 cursor-not-allowed"
              />
            </div> */}
        <div>
          <FormFileInput
            label="Photo"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <p className="text-xs text-gray-500 mt-1">
            Format file: PDF, JPG, atau PNG. Maksimal 2MB.
          </p>
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
