"use client";

import FormInput from "@/components/frontend/FormInput";
import Pagination from "@/components/frontend/Pagination";
import { useHandleAxiosError } from "@/lib/handleError";
import { Search } from "lucide-react";
import { useState } from "react";

interface PaymentVerifiedLog {
  id: string;
  payment: {
    team: {
      teamName: string;
    };
  };
  verifiedBy: {
    fullName: string;
  };
  notes: string;
  verifiedAt: string;
  status: string;
}

interface Meta {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

interface EmailLogTableProps {
  paymentVerifieds: PaymentVerifiedLog[];
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

export default function PaymentVerifiedLogTable({
  paymentVerifieds,
  meta,
  onPageChange,
  onStatusFilter,
  onSearch,
}: EmailLogTableProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>("paid");
  const [searchQuery, setSearchQuery] = useState("");
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
      <div className="grid  md:flex items-center md:justify-between gap-5">
        {/* <div className="md:space-x-2 grid grid-cols-2 gap-2 md:flex">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className={`rounded border px-0 md:px-3 py-1 text-sm font-medium ${
                status === selectedStatus
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div> */}
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <FormInput
            type="text"
            placeholder="Search paymentLog..."
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
        <table className="min-w-full divide-y divide-gray-200 text-sm md:table hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Team Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Verified By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Verified At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Notes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {paymentVerifieds.length == 0 && (
              <tr>
                <td
                  className="whitespace-nowrap px-6 py-4 text-center"
                  colSpan={5}
                >
                  Data Not Found
                </td>
              </tr>
            )}
            {paymentVerifieds.map((verifiedLog) => (
              <tr key={verifiedLog.id}>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {verifiedLog.payment.team.teamName}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {verifiedLog.verifiedBy.fullName}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {new Date(verifiedLog.verifiedAt).toLocaleString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {verifiedLog.notes}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      verifiedLog.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : verifiedLog.status == "failed"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {verifiedLog.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {paymentVerifieds.length === 0 ? (
          <p className="text-center text-gray-500">Data Not Found</p>
        ) : (
          paymentVerifieds.map((log) => (
            <div
              key={log.id}
              className="rounded-lg border p-4 bg-white shadow-sm space-y-2"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  {log.payment.team.teamName}
                </p>
                <p className="text-sm text-gray-600">
                  Verified by: {log.verifiedBy.fullName}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(log.verifiedAt).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">{log.notes}</p>
                <span
                  className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${
                    log.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : log.status === "failed"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {log.status}
                </span>
              </div>
            </div>
          ))
        )}
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
    </div>
  );
}
