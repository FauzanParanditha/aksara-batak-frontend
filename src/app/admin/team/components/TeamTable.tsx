"use client";

import { useConfirmDialog } from "@/components/ConfirmDialogProvider";
import FormInput from "@/components/frontend/FormInput";
import Pagination from "@/components/frontend/Pagination";
import { toast } from "@/hooks/use-toast";
import clientAxios from "@/lib/axios/client";
import { useHandleAxiosError } from "@/lib/handleError";
import { SCORING_WEIGHT } from "@/utils/var";
import { Pencil, Search, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { mutate } from "swr";
import TeamForm from "./TeamForm";

interface Team {
  id: string;
  teamName: string;
  category: string;
  institution?: string;
  queueNumber?: string;
  scores: {
    id?: string;
    judgeId: string;
    teamId?: string;
    criteria: string;
    score: number;
    comment?: string;
    judge?: { fullName: string };
  }[];
  paymentStatus: string;
  submissionLink?: string;
  photoUrl?: string;
  weightedScore: number | null;
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

// Helper: ambil daftar juri unik dari semua tim di halaman (stabil, first-seen order)
function getJudgeList(teams: Team[]) {
  const map = new Map<string, string>();
  for (const t of teams ?? []) {
    for (const s of t.scores ?? []) {
      if (!map.has(s.judgeId)) {
        map.set(
          s.judgeId,
          s.judge?.fullName ?? `Judge ${s.judgeId?.slice?.(-6) ?? ""}`
        );
      }
    }
  }
  return Array.from(map.entries()).map(([judgeId, name]) => ({
    judgeId,
    name,
  }));
}

// Helper: rata-rata skor dari judge tertentu untuk sebuah tim
export const avgForJudge = (
  team: {
    scores: { judgeId: string; criteria: string; score: number }[];
  },
  judgeId: string
): number | null => {
  const judgeScores = team.scores.filter((s) => s.judgeId === judgeId);

  if (judgeScores.length === 0) return null;

  let totalScore = 0;
  let totalWeight = 0;

  for (const s of judgeScores) {
    const weight = SCORING_WEIGHT[s.criteria] ?? 0;
    totalScore += s.score * weight;
    totalWeight += weight;
  }

  return totalWeight > 0 ? totalScore / totalWeight : 0;
};

export default function TeamTable({
  teams,
  meta,
  onPageChange,
  onSearch,
}: TeamTableProps) {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editData, setEditData] = useState<Team | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const handleAxiosError = useHandleAxiosError();
  const confirm = useConfirmDialog();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirm({
      title: "Delete Team?",
      description:
        "Are you sure you want to delete this team? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
    });
    if (!isConfirmed) return;
    try {
      await clientAxios.delete(`/v1/teams/${id}`);
      await mutate(`/v1/teams?page=${meta.page}&search=${searchQuery}`);
      toast({ title: "Team delete successfully" });
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // Daftar juri unik untuk kolom dinamis
  const judgeList = useMemo(() => getJudgeList(teams ?? []), [teams]);

  return (
    <div className="space-y-4">
      {/* Top bar */}
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
        {/* Tombol Add disembunyikan sesuai kode awal
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
        >
          <Plus size={16} /> Add Team
        </button> */}
      </div>

      {/* Desktop table */}
      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm md:table hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Team Name
              </th>
              {judgeList.map((j) => (
                <th
                  key={j.judgeId}
                  className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500"
                >
                  {j.name}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Total
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {(!teams || teams?.length === 0) && (
              <tr>
                <td
                  colSpan={2 + judgeList.length}
                  className="whitespace-nowrap px-6 py-4 text-center"
                >
                  Data not Found
                </td>
              </tr>
            )}

            {teams?.map((team) => (
              <tr key={team.id}>
                {/* Team Name */}
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  <div className="flex items-center gap-3">
                    <div>
                      <div>{team.teamName}</div>
                    </div>
                  </div>
                </td>

                {/* Judge columns */}
                {judgeList.map((j) => {
                  const avg = avgForJudge(team, j.judgeId);
                  return (
                    <td
                      key={j.judgeId}
                      className="px-6 py-4 text-sm text-gray-700"
                    >
                      {avg === null ? "-" : avg.toFixed(2)}
                    </td>
                  );
                })}

                {/* Total (pakai weightedScore) */}
                <td className="px-6 py-4 text-sm text-gray-700">
                  {team.weightedScore ?? "-"}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    className="text-blue-600 hover:text-blue-900"
                    onClick={() => {
                      setEditData(team);
                      setShowForm(true);
                    }}
                    title="Edit"
                    aria-label="Edit team"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(team.id)}
                    title="Delete"
                    aria-label="Delete team"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile list/cards */}
      <div className="md:hidden space-y-4">
        {teams?.map((team) => (
          <div
            key={team.id}
            className="rounded-lg border p-4 shadow-sm bg-white"
          >
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <p className="font-medium text-gray-900">{team.teamName}</p>
                <p className="text-xs text-gray-500">{team.category}</p>
              </div>
            </div>

            {/* Status & Submission */}
            <div className="mt-2 flex items-center justify-between">
              <span
                className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                  team.paymentStatus === "paid"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {team.paymentStatus}
              </span>

              {team.submissionLink && (
                <button
                  onClick={() =>
                    setPreviewUrl(
                      `${process.env.NEXT_PUBLIC_CLIENT_PUBLIC_URL}${team.submissionLink}`
                    )
                  }
                  className="text-xs text-blue-600 hover:underline"
                >
                  View Submission
                </button>
              )}
            </div>

            {/* Scores per judge */}
            <div className="mt-3">
              <div className="text-sm">
                <div className="mb-1">
                  Total (weighted):{" "}
                  <span className="font-semibold">
                    {team.weightedScore ?? "-"}
                  </span>
                </div>

                {judgeList.length > 0 ? (
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                    {judgeList.map((j) => {
                      const avg = avgForJudge(team, j.judgeId);
                      return (
                        <div
                          key={j.judgeId}
                          className="flex items-center justify-between"
                        >
                          <span className="text-gray-500 truncate">
                            {j.name}
                          </span>
                          <span className="font-medium">
                            {avg === null ? "-" : avg.toFixed(2)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-xs text-gray-400">No judge scores</div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-3">
              <button
                className="text-blue-600"
                onClick={() => {
                  setEditData(team);
                  setShowForm(true);
                }}
                aria-label="Edit team"
              >
                <Pencil size={16} />
              </button>
              <button
                className="text-red-600"
                onClick={() => handleDelete(team.id)}
                aria-label="Delete team"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {meta?.totalPages > 1 && (
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

      {/* Form (Add/Edit) */}
      {showForm && (
        <TeamForm
          initialData={editData || undefined}
          onClose={() => setShowForm(false)}
          onSubmit={async (formData) => {
            try {
              if (editData?.id) {
                await clientAxios.put(`/v1/teams/${editData.id}`, formData);
                toast({ title: "Team updated successfully" });
              } else {
                await clientAxios.post(`/v1/teams`, formData);
                toast({ title: "Successfully added team" });
              }
              await mutate(`/v1/teams?page=${meta.page}&search=${searchQuery}`);
              setShowForm(false);
            } catch (err) {
              handleAxiosError(err);
            }
          }}
        />
      )}

      {/* Preview overlay */}
      {previewUrl && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-80">
          <div className="relative max-h-full max-w-full">
            <button
              onClick={() => setPreviewUrl(null)}
              className="absolute right-2 top-2 rounded-full bg-white p-1 hover:bg-gray-200"
              aria-label="Close preview"
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
