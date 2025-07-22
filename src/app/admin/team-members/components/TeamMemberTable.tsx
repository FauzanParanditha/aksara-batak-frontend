"use client";

import { useConfirmDialog } from "@/components/ConfirmDialogProvider";
import FormInput from "@/components/frontend/FormInput";
import Pagination from "@/components/frontend/Pagination";
import { toast } from "@/hooks/use-toast";
import clientAxios from "@/lib/axios/client";
import { useHandleAxiosError } from "@/lib/handleError";
import { Pencil, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { mutate } from "swr";
import TeamMemberForm from "./TeamMemberForm";

interface TeamMember {
  id: string;
  teamId: string;
  fullName: string;
  email: string;
  institution: string;
  roleInTeam: string;
}

interface Meta {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

interface TeamMemberTableProps {
  teamMembers: TeamMember[];
  meta: Meta;
  onPageChange: (page: number) => void;
  onStatusFilter?: (status: string) => void;
  onSearch?: (query: string) => void;
}

export default function TeamMemberTable({
  teamMembers,
  meta,
  onPageChange,
  onSearch,
}: TeamMemberTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<TeamMember | null>(null);
  const handleAxiosError = useHandleAxiosError();
  const confirm = useConfirmDialog();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirm({
      title: "Delete team member?",
      description:
        "Are you sure you want to delete this team member? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
    });
    if (!isConfirmed) return;
    try {
      await clientAxios.delete(`/v1/team-members/${id}`);
      await mutate(`/v1/team-members?page=${meta.page}&search=${searchQuery}`);
      toast({ title: "Team member delete successfully" });
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
            placeholder="Search team member..."
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
                fullName
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Institution
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Role in Team
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {teamMembers.length == 0 && (
              <tr>
                <td
                  className="whitespace-nowrap px-6 py-4 text-center"
                  colSpan={5}
                >
                  Data Not Found
                </td>
              </tr>
            )}
            {teamMembers.map((teamMember) => (
              <tr key={teamMember.id}>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {teamMember.fullName}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {teamMember.email}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {teamMember.institution}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {teamMember.roleInTeam}
                </td>
                <td className="space-x-2 whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <button
                    className="text-blue-600 hover:text-blue-900"
                    onClick={() => {
                      setEditData(teamMember);
                      setShowForm(true);
                    }}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(teamMember.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden space-y-4">
        {teamMembers.length === 0 ? (
          <div className="text-center text-gray-500">Data Not Found</div>
        ) : (
          teamMembers.map((member) => (
            <div
              key={member.id}
              className="rounded-lg border p-4 shadow-sm bg-white space-y-1"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {member.fullName}
                  </p>
                  <p className="text-xs text-gray-500">{member.email}</p>
                  <p className="text-xs text-gray-500">
                    {member.institution} — {member.roleInTeam}
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    setEditData(member);
                    setShowForm(true);
                  }}
                  className="text-blue-600 hover:underline"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="text-red-600 hover:underline"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showForm && (
        <TeamMemberForm
          initialData={editData || undefined}
          onClose={() => setShowForm(false)}
          onSubmit={async (formData) => {
            // console.log("Submit sponsor", formData);
            try {
              if (editData?.id) {
                await clientAxios.put(
                  `/v1/team-members/${editData.id}`,
                  formData
                );
                toast({ title: "Successfully edited team member" });
              } else {
                await clientAxios.post(`/v1/team-members`, formData);
                toast({ title: "Successfully added team member" });
              }
              await mutate(
                `/v1/team-members?page=${meta.page}&search=${searchQuery}`
              );
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
