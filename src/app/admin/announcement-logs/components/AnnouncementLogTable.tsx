"use client";

import FormInput from "@/components/frontend/FormInput";
import Pagination from "@/components/frontend/Pagination";
import { useHandleAxiosError } from "@/lib/handleError";
import { Search } from "lucide-react";
import { useState } from "react";

interface AnnouncementLog {
  id: string;
  title: string;
  content: string;
  target: string;
  createdAt: string;
}

interface Meta {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

interface AnnouncementLogTableProps {
  announcementLogs: AnnouncementLog[];
  meta: Meta;
  onPageChange: (page: number) => void;
  onSearch?: (query: string) => void;
}

export default function AnnouncementLogTable({
  announcementLogs,
  meta,
  onPageChange,
  onSearch,
}: AnnouncementLogTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const handleAxiosError = useHandleAxiosError();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <FormInput
            type="text"
            placeholder="Search announcementLog..."
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
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Content
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Target
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                CreatedAt
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {announcementLogs.length == 0 && (
              <tr>
                <td
                  className="whitespace-nowrap px-6 py-4 text-center"
                  colSpan={4}
                >
                  Data Not Found
                </td>
              </tr>
            )}
            {announcementLogs.map((announcementLog) => (
              <tr key={announcementLog.id}>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {announcementLog.title}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {announcementLog.content}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {announcementLog.target}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {new Date(announcementLog.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="md:hidden space-y-4">
        {announcementLogs.length === 0 ? (
          <p className="text-center text-gray-500">Data Not Found</p>
        ) : (
          announcementLogs.map((log) => (
            <div
              key={log.id}
              className="rounded-lg border p-4 shadow-sm bg-white space-y-1"
            >
              <h3 className="font-semibold text-gray-800">{log.title}</h3>
              <p className="text-sm text-gray-600">{log.content}</p>
              <div className="text-sm text-gray-500">Target: {log.target}</div>
              <div className="text-xs text-gray-400">
                {new Date(log.createdAt).toLocaleString()}
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
