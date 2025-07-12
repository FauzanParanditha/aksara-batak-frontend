"use client";

import { useConfirmDialog } from "@/components/ConfirmDialogProvider";
import FormInput from "@/components/frontend/FormInput";
import Pagination from "@/components/frontend/Pagination";
import clientAxios from "@/lib/axios/client";
import { useHandleAxiosError } from "@/lib/handleError";
import { Pencil, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";
import LeaderForm from "./LeaderForm";

interface Leader {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isVerified: boolean;
  phone: string;
  password: string;
}

interface Meta {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

interface LeaderTableProps {
  leaders: Leader[];
  meta: Meta;
  onPageChange: (page: number) => void;
  onStatusFilter?: (status: string) => void;
  onSearch?: (query: string) => void;
}

export default function LeaderTable({
  leaders,
  meta,
  onPageChange,
  onSearch,
}: LeaderTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<Leader | null>(null);
  const handleAxiosError = useHandleAxiosError();
  const confirm = useConfirmDialog();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirm({
      title: "Delete Leader?",
      description:
        "Are you sure you want to delete this leader? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
    });
    if (!isConfirmed) return;
    try {
      await clientAxios.delete(`/v1/leaders/${id}`);
      await mutate(`/v1/leaders?page=${meta.page}&search=${searchQuery}`);
      toast.success("Leader delete successfully");
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <FormInput
            type="text"
            placeholder="Search leader..."
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
                fullName
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                isVerified
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Phone
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {leaders.length == 0 && (
              <tr>
                <td
                  className="whitespace-nowrap px-6 py-4 text-center"
                  colSpan={6}
                >
                  Data Not Found
                </td>
              </tr>
            )}
            {leaders.map((leader) => (
              <tr key={leader.id}>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {leader.fullName}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {leader.email}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {leader.role}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      leader.isVerified == true
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {leader.isVerified ? "Verified" : "Unverified"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {leader.phone}
                </td>
                <td className="space-x-2 whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <button
                    className="text-blue-600 hover:text-blue-900"
                    onClick={() => {
                      setEditData(leader);
                      setShowForm(true);
                    }}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(leader.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <LeaderForm
          initialData={editData || undefined}
          onClose={() => setShowForm(false)}
          onSubmit={async (formData) => {
            // console.log("Submit sponsor", formData);
            try {
              if (editData?.id) {
                await clientAxios.put(`/v1/users/${editData.id}`, formData);
                toast.success("Successfully edited user");
              } else {
                await clientAxios.post(`/v1/users`, formData);
                toast.success("Successfully added user");
              }
              await mutate(`/v1/users?page=${meta.page}&search=${searchQuery}`);
              setShowForm(false);
            } catch (err) {
              handleAxiosError(err);
            }
          }}
        />
      )}
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
