"use client";

import FormInput from "@/components/frontend/FormInput";
import Pagination from "@/components/frontend/Pagination";
import { toast } from "@/hooks/use-toast";
import clientAxios from "@/lib/axios/client";
import { useHandleAxiosError } from "@/lib/handleError";
import { Pencil, Plus, Search, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { mutate } from "swr";
import TeamForm from "./TeamForm";

interface Team {
  id: string;
  teamName: string;
  category: string;
}

interface Meta {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

interface TeamTableProps {
  teams: Team[];
  meta: Meta;
  onPageChange: (page: number) => void;
  onSearch?: (query: string) => void;
}

export default function TeamTable({
  teams,
  meta,
  onPageChange,
  onSearch,
}: TeamTableProps) {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const handleAxiosError = useHandleAxiosError();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this team?"
    );
    if (!confirm) return;
    try {
      await clientAxios.delete(`/v1/teams/${id}`);
      await mutate(`/v1/teams?&search=${searchQuery}`);
      toast({ title: "Team delete successfully" });
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
            placeholder="Search team..."
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
          onClick={handleAddClick}
          className="flex items-center gap-2 rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
        >
          <Plus size={16} /> Add Team
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Team Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Category
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {teams?.length == 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="whitespace-nowrap px-6 py-4 text-center"
                >
                  Data not Found
                </td>
              </tr>
            )}
            {teams.map((team) => (
              <tr key={team.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {team.teamName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {team.category || "-"}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Link href={`/admin/team/${team.id}`}>
                    <button className="text-blue-600 hover:text-blue-900">
                      <Pencil size={16} />
                    </button>
                  </Link>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(team.id)}
                  >
                    <Trash2 size={16} />
                  </button>
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

      {showForm && (
        <TeamForm
          onClose={() => setShowForm(false)}
          onSubmit={async (formData) => {
            try {
              await clientAxios.post(`/v1/teams`, formData);
              toast({ title: "Successfully added team" });
              await mutate(`/v1/teams?&search=${searchQuery}`);
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
