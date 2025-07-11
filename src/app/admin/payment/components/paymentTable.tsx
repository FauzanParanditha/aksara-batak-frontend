"use client";

import FormInput from "@/components/frontend/FormInput";
import Pagination from "@/components/frontend/Pagination";
import { toast } from "@/hooks/use-toast";
import clientAxios from "@/lib/axios/client";
import { useHandleAxiosError } from "@/lib/handleError";
import { Pencil, Search, X } from "lucide-react";
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
interface Meta {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

interface PaymentTableProps {
  payments: Payment[];
  meta: Meta;
  onPageChange: (page: number) => void;
  onStatusFilter?: (status: string) => void;
  onSearch?: (query: string) => void;
}

const statusOptions = [
  "unpaid",
  "pending",
  "waiting_verification",
  "paid",
  "failed",
  "expired",
  "rejected",
];

export default function PaymentTable({
  payments,
  meta,
  onPageChange,
  onStatusFilter,
  onSearch,
}: PaymentTableProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>(
    "waiting_verification"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [id, setId] = useState("");
  const handleAxiosError = useHandleAxiosError();

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    if (onStatusFilter) onStatusFilter(status);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-x-2">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className={`rounded border px-3 py-1 text-sm font-medium ${
                status === selectedStatus
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
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
      </div>

      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
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
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {payments.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
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
                  {pay.paidAt && pay.status != "paid" && (
                    <td className="space-x-2 whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => {
                          setShowForm(true);
                          setId(pay.id);
                        }}
                      >
                        <Pencil size={16} />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {meta.totalPages > 1 && (
        <Pagination
          paginate={{
            currentPage: meta.page,
            totalPages: meta.totalPages,
            perPage: meta.limit,
            totalRecords: meta.totalCount,
          }}
          onPageChange={onPageChange}
          limit={1}
        />
      )}

      {showForm && (
        <PaymentForm
          onClose={() => setShowForm(false)}
          onSubmit={async (formData) => {
            // console.log("Submit speaker", formData);
            try {
              await clientAxios.patch(
                `/v1/payments/manual/${id}/verify`,
                formData
              );
              toast({ title: "Successfully verify" });
              await mutate(
                `/v1/payments?page=${meta.page}&status=${selectedStatus}&search=${searchQuery}`
              );
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
