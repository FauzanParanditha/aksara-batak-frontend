"use client";

import { useConfirmDialog } from "@/components/ConfirmDialogProvider";
import FormInput from "@/components/frontend/FormInput";
import Pagination from "@/components/frontend/Pagination";
import { toast } from "@/hooks/use-toast";
import clientAxios from "@/lib/axios/client";
import { useHandleAxiosError } from "@/lib/handleError";
import { Download, Pencil, Search, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { mutate } from "swr";
import JudgeScoreForm from "./JudgeForm";

interface Team {
  id: string;
  teamName: string;
  category: string;
  institution: string;
  queueNumber: string;
  scores: {
    id: string;
    judgeId: string;
    teamId: string;
    criteria: string;
    score: number;
    comment: string;
  }[];
  submissionLink?: string;
  photoUrl?: string;
  weightedScore: number;
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
  const [editData, setEditData] = useState<Team | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const handleAxiosError = useHandleAxiosError();
  const isPdf = previewUrl?.toLowerCase().endsWith(".pdf");
  const confirm = useConfirmDialog();

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
        {/* <button
          onClick={handleAddClick}
          className="flex items-center gap-2 rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
        >
          <Plus size={16} /> Add Team
        </button> */}
      </div>

      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm md:table hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Website Lomba
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Score
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {(!teams || teams?.length == 0) && (
              <tr>
                <td
                  colSpan={7}
                  className="whitespace-nowrap px-6 py-4 text-center"
                >
                  Data not Found
                </td>
              </tr>
            )}
            {teams?.map((team) => (
              <tr key={team.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  <a
                    href={`https://${team.teamName}`}
                    target="_blank"
                    className="text-blue-500"
                  >
                    {team.teamName}
                  </a>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {/* {team.scores?.reduce((acc, s) => acc + s.score, 0) || 0} */}
                  {team.weightedScore}
                </td>
                {/* {team.submissionLink && ( */}
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    className="text-blue-600 hover:text-blue-900"
                    onClick={() => {
                      setEditData(team);
                      setShowForm(true);
                    }}
                  >
                    <Pencil size={16} />
                  </button>
                </td>
                {/* )} */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {teams?.map((team) => (
          <div
            key={team.id}
            className="rounded-lg border p-4 shadow-sm bg-white"
          >
            <div className="flex items-center gap-3">
              {team.photoUrl ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_CLIENT_PUBLIC_URL}${team.photoUrl}`}
                  alt={team.teamName}
                  width={40}
                  height={40}
                  className="rounded-full object-cover h-10 w-10"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-xs text-gray-400">
                  N/A
                </div>
              )}
              <div className="flex-1">
                <p className="font-medium text-gray-900">{team.teamName}</p>
                <p className="text-xs text-gray-500">{team.category}</p>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Team #: {team.queueNumber}
            </div>
            <div className="text-sm">
              Score: {team.scores?.reduce((acc, s) => acc + s.score, 0) || 0}
            </div>
            {team.submissionLink && (
              <div className="flex flex-row gap-2">
                <button
                  onClick={() =>
                    setPreviewUrl(
                      `${process.env.NEXT_PUBLIC_CLIENT_PUBLIC_URL}${team.submissionLink}`
                    )
                  }
                  className="mt-2 text-sm text-blue-600 hover:underline"
                >
                  View Submission
                </button>
                <button className="hover:text-blue-600">
                  <a
                    href={`${process.env.NEXT_PUBLIC_CLIENT_PUBLIC_URL}${team.submissionLink}`}
                  >
                    <Download />{" "}
                  </a>
                </button>
              </div>
            )}
            {team.submissionLink && (
              <div className="flex justify-end gap-3 pt-2">
                <button
                  className="text-blue-600"
                  onClick={() => {
                    setEditData(team);
                    setShowForm(true);
                  }}
                >
                  <Pencil size={16} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

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

      {showForm && editData && (
        <JudgeScoreForm
          initialData={{
            scores: editData.scores.reduce(
              (acc, score) => ({ ...acc, [score.criteria]: score.score }),
              {}
            ),
            comments: editData.scores.find((s) => s.comment)?.comment || "",
          }}
          teamName={editData.teamName}
          onClose={() => setShowForm(false)}
          onSubmit={async ({ scores, comments }) => {
            try {
              await clientAxios.post("/v1/scores", {
                teamId: editData.id,
                scores,
                comments,
              });
              toast({ title: "Skor berhasil disimpan" });
              await mutate(`/v1/teams?page=${meta.page}&search=${searchQuery}`);
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
            {isPdf ? (
              <iframe
                src={previewUrl}
                title="PDF Preview"
                className="h-[90vh] w-[90vw] rounded shadow-lg"
              />
            ) : (
              <Image
                src={previewUrl}
                alt="Preview"
                width={600}
                height={600}
                className="max-h-[90vh] max-w-[90vw] rounded object-contain shadow-lg"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
