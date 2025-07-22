"use client";

import FormInput from "@/components/frontend/FormInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import clientAxios from "@/lib/axios/client";
import { useHandleAxiosError } from "@/lib/handleError";
import { Plus, Search, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { mutate } from "swr";
import PaymentForm from "./PaymentForm";

interface Payment {
  id: string;
  team: {
    teamName: string;
  };
  method: string;
  amount: string;
  paidAt: string;
  status: string;
  manualProofUrl?: string;
}

interface PaymentTableProps {
  payments: Payment[];
  onSearch?: (query: string) => void;
}

export default function PaymentTable({
  payments,
  onSearch,
}: PaymentTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [vaNumber] = useState("2918887771");
  const [vaName] = useState("PENGELOLA NAMA DOMAIN INTERNET INDONESIA");
  const [amount] = useState(100000);
  const handleAxiosError = useHandleAxiosError();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  const handlePaymentClick = () => {
    setShowForm(true);
  };

  return (
    <div className="space-y-4">
      <div className="grid md:flex items-center md:justify-between gap-5">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <FormInput
            type="text"
            placeholder="Search payment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded border border-blue-600 px-3 py-2 md:w-64"
          />
          <button
            type="submit"
            className="rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
          >
            <Search size={16} />
          </button>
        </form>
        <button
          onClick={handlePaymentClick}
          className="flex items-center gap-2 rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
        >
          <Plus size={16} /> Upload Payment
        </button>
      </div>

      {/* INFO */}
      <Card className="max-w-2xl mx-auto mt-10 shadow-lg">
        <CardHeader className="flex flex-col items-start gap-2">
          <CardTitle className="text-xl">Manual Payment</CardTitle>
          <div className="flex items-center gap-3">
            <Image
              src="/images/bank/bca.png"
              alt="Bank BCA"
              width={48}
              height={48}
            />
            <div>
              <p className="font-medium text-sm">Transfer to BCA Bank</p>
              <p className="text-sm text-gray-500">
                Please make payment to the following account number and upload
                proof of payment for verification.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              value={vaName}
              readOnly
              className="bg-gray-100 font-mono cursor-not-allowed"
            />
          </div>
          <div>
            <Label>Account Number</Label>
            <Input
              value={vaNumber}
              readOnly
              className="bg-gray-100 font-mono cursor-not-allowed"
            />
          </div>
          <div>
            <Label>Payment Amount</Label>
            <Input
              value={`Rp ${amount.toLocaleString()}`}
              readOnly
              className="bg-gray-100 cursor-not-allowed"
            />
          </div>
        </CardContent>
      </Card>

      <div className="hidden md:block overflow-x-auto rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm md:hidden hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Photo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Team Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Paid At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {payments.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="whitespace-nowrap px-6 py-4 text-center"
                >
                  Data not found
                </td>
              </tr>
            ) : (
              payments.map((pay) => (
                <tr key={pay.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    {pay.manualProofUrl ? (
                      <button
                        onClick={() =>
                          setPreviewUrl(
                            `${process.env.NEXT_PUBLIC_CLIENT_PUBLIC_URL}${pay.manualProofUrl}`
                          )
                        }
                        className="h-10 w-10 overflow-hidden rounded-full border"
                      >
                        <Image
                          src={`${process.env.NEXT_PUBLIC_CLIENT_PUBLIC_URL}${pay.manualProofUrl}`}
                          alt={pay.team.teamName}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      </button>
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-xs text-gray-400">
                        N/A
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {pay.team.teamName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {pay.method}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {pay.amount}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {pay.paidAt}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {pay.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Card view untuk mobile */}
      <div className="block md:hidden space-y-4">
        {payments.length === 0 ? (
          <div className="rounded border p-4 text-center text-sm text-gray-500">
            Data not found
          </div>
        ) : (
          payments.map((pay) => (
            <div key={pay.id} className="rounded-lg bg-white p-4 shadow">
              <div className="flex items-center gap-4 mb-2">
                {pay.manualProofUrl ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_CLIENT_PUBLIC_URL}${pay.manualProofUrl}`}
                    alt={pay.team.teamName}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-200 text-sm text-gray-400">
                    N/A
                  </div>
                )}
                <div>
                  <p className="font-semibold">{pay.team.teamName}</p>
                  <p className="text-xs text-gray-500">{pay.method}</p>
                </div>
              </div>
              <div className="space-y-1 text-sm text-gray-700">
                <p>
                  <span className="font-medium">Amount:</span> {pay.amount}
                </p>
                <p>
                  <span className="font-medium">Paid At:</span> {pay.paidAt}
                </p>
                <p>
                  <span className="font-medium">Status:</span> {pay.status}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {showForm && (
        <PaymentForm
          onClose={() => setShowForm(false)}
          onSubmit={async (formData) => {
            // console.log("Submit speaker", formData);
            try {
              await clientAxios.post("/v1/payments/manual", formData);

              toast({
                title: `Proof of payment for VA ${vaNumber} in the amount of Rp${amount.toLocaleString()} has been successfully uploaded.`,
              });

              await mutate(`/v1/payments?&search=${searchQuery}`);
              setShowForm(false);
            } catch (err) {
              handleAxiosError(err);
            }
          }}
        />
      )}

      {previewUrl && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-80">
          <div className="relative max-h-full max-w-full">
            <button
              onClick={() => setPreviewUrl(null)}
              className="absolute right-2 top-2 rounded-full bg-white p-1 hover:bg-gray-200"
            >
              <X size={20} />
            </button>
            <Image
              src={previewUrl}
              alt="Preview"
              width={600}
              height={600}
              className="max-h-[90vh] max-w-[90vw] rounded object-contain shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
