"use client";

import FormInput from "@/components/frontend/FormInput";
import Pagination from "@/components/frontend/Pagination";
import clientAxios from "@/lib/axios/client";
import { useHandleAxiosError } from "@/lib/handleError";
import { RotateCcw, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface EmailLog {
  id: string;
  to: string;
  subject: string;
  type: string;
  status: string;
  sentAt: string;
  errorMessage?: string;
}

interface Meta {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

interface EmailLogTableProps {
  emailLogs: EmailLog[];
  meta: Meta;
  onPageChange: (page: number) => void;
  onStatusFilter?: (status: string) => void;
  onSearch?: (query: string) => void;
}

const statusOptions = ["all", "success", "failed", "pending"];

export default function EmailLogTable({
  emailLogs,
  meta,
  onPageChange,
  onStatusFilter,
  onSearch,
}: EmailLogTableProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
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

  const handleRetry = async (id: string, email: string) => {
    const confirm = window.confirm(
      "Are you sure you want to retry this email-log?"
    );
    if (!confirm) return;
    try {
      await clientAxios.post(`/v1/email-logs/retry/${id}`, { email });
      await mutate(
        `/v1/email-logs?page=${meta.page}&status=${selectedStatus}&search=${searchQuery}`
      );
      toast.success("Email Log successfully retry");
    } catch (error) {
      handleAxiosError(error);
    }
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
            placeholder="Search emailLog..."
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
                To
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Sent At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Error Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {emailLogs.length == 0 && (
              <tr>
                <td
                  className="whitespace-nowrap px-6 py-4 text-center"
                  colSpan={7}
                >
                  Data Not Found
                </td>
              </tr>
            )}
            {emailLogs.map((emailLog) => (
              <tr key={emailLog.id}>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {emailLog.to}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {emailLog.subject}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {emailLog.type}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      emailLog.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : emailLog.status == "failed"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {emailLog.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {new Date(emailLog.sentAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {emailLog.errorMessage}
                </td>
                <td className="space-x-2 whitespace-nowrap px-6 py-4 text-center text-sm font-medium">
                  {emailLog.status != "success" && (
                    <button
                      onClick={() => handleRetry(emailLog.id, emailLog.to)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <RotateCcw size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
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
    </div>
  );
}
