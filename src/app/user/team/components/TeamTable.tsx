"use client";

import { useConfirmDialog } from "@/components/ConfirmDialogProvider";
import FormInput from "@/components/frontend/FormInput";
import { toast } from "@/hooks/use-toast";
import clientAxios from "@/lib/axios/client";
import { useHandleAxiosError } from "@/lib/handleError";
import { Pencil, Plus, Search, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import AddMemberToTeam from "./AddMemberToTeam";
import SubmissionForm from "./SubmissionForm";
import TeamForm from "./TeamForm";

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
  paymentStatus: string;
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
interface Member {
  teamId?: string;
  id?: string;
  fullName: string;
  email: string;
  institution: string;
  roleInTeam: string;
}

interface TeamTableProps {
  team: Team;
  onSearch?: (query: string) => void;
}

export default function TeamTable({ team, onSearch }: TeamTableProps) {
  const [showForm, setShowForm] = useState(false);
  const [showFormMember, setShowFormMember] = useState(false);
  const [showFormSubmission, setShowFormSubmission] = useState(false);
  const [editData, setEditData] = useState<Team | null>(null);
  const [editDataMember, setEditDataMember] = useState<Member | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const handleAxiosError = useHandleAxiosError();
  const isPdf = previewUrl?.toLowerCase().endsWith(".pdf");
  const confirm = useConfirmDialog();
  const router = useRouter();

  const { data: members } = useSWR(`/v1/team-members/${team?.id}`);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  const handleAddClick = () => {
    setEditData(null);
    setShowForm(true);
  };

  const handleAddMemberClick = () => {
    setShowFormMember(true);
  };
  const handleAddSubmissionClick = async () => {
    if (team?.paymentStatus != "paid") {
      const shouldPay = await confirm({
        title: "Continue to Payment?",
        description:
          "Would you like to proceed directly to the payment process?",
        confirmText: "Pay now",
        cancelText: "Later",
      });
      if (shouldPay) {
        router.push(`/user/payment`);
      }
    } else {
      setShowFormSubmission(true);
    }
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirm({
      title: "Delete team?",
      description:
        "Are you sure you want to delete this team? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
    });
    if (!isConfirmed) return;
    try {
      await clientAxios.delete(`/v1/teams/${id}`);
      await mutate(`/v1/teams?&search=${searchQuery}`);
      toast({ title: "Team delete successfully" });
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleDeleteMember = async (id: string) => {
    const isConfirmed = await confirm({
      title: "Delete member?",
      description:
        "Are you sure you want to delete this member? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
    });
    if (!isConfirmed) return;
    try {
      const res = await clientAxios.delete(`/v1/team-members/${id}`);
      if (res.status !== 200) {
        toast({
          title: "Failed to delete member",
        });
      } else {
        toast({
          title: "Member deleted successfully",
        });
        mutate(`/v1/team-members/${team?.id}`); // Revalidate the members data
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid md:flex items-center md:justify-between gap-5">
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
        <div className="flex flex-row gap-2">
          {team && (
            <button
              onClick={handleAddSubmissionClick}
              className={`flex items-center gap-2 rounded ${
                team.paymentStatus == "paid"
                  ? "bg-blue-600 hover:bg-blue-700 "
                  : "bg-blue-300 hover:bg-blue-700"
              } px-3 py-2 text-white `}
            >
              <Plus size={16} />{" "}
              {team?.submissionLink ? "Update Submission" : "Add Submission"}
            </button>
          )}
          <button
            onClick={handleAddClick}
            className="flex items-center gap-2 rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
          >
            <Plus size={16} /> Add Team
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm md:table hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Photo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Team Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Team number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Payment Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Submission
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {!team ? (
              <tr>
                <td
                  colSpan={8}
                  className="whitespace-nowrap px-6 py-4 text-center"
                >
                  Data not found
                </td>
              </tr>
            ) : (
              <tr key={team.id}>
                <td className="whitespace-nowrap px-6 py-4">
                  {team.photoUrl ? (
                    <button
                      onClick={() =>
                        setPreviewUrl(
                          `${process.env.NEXT_PUBLIC_CLIENT_PUBLIC_URL}${team.photoUrl}`
                        )
                      }
                      className="h-10 w-10 overflow-hidden rounded-full border"
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_CLIENT_PUBLIC_URL}${team.photoUrl}`}
                        alt={team.teamName}
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
                  {team.teamName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {team.category}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {team.queueNumber || 0}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {/* {team.scores?.reduce((acc, s) => acc + s.score, 0) || 0} */}
                  {team.weightedScore}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      team.paymentStatus == "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {team.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {team.submissionLink ? (
                    <button
                      onClick={() =>
                        setPreviewUrl(
                          `${process.env.NEXT_PUBLIC_CLIENT_PUBLIC_URL}${team.submissionLink}`
                        )
                      }
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View Submission
                    </button>
                  ) : (
                    <span className="text-red-500">No Submission</span>
                  )}
                </td>
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
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(team.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {!team ? (
          <div className="rounded border p-4 text-center text-sm text-gray-500">
            Data not found
          </div>
        ) : (
          <div className="rounded border p-4 shadow">
            <div className="flex items-center gap-4">
              {team.photoUrl ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_CLIENT_PUBLIC_URL}${team.photoUrl}`}
                  alt={team.teamName}
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-xs text-gray-400">
                  N/A
                </div>
              )}
              <div>
                <div className="text-sm font-semibold">{team.teamName}</div>
                <div className="text-xs text-gray-500">{team.category}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1 text-sm text-gray-700">
              <div>
                <span className="font-medium">Queue:</span>{" "}
                {team.queueNumber || 0}
              </div>
              <div className="text-sm">
                Score: {team.scores?.reduce((acc, s) => acc + s.score, 0) || 0}
              </div>
              <div>
                <span className="font-medium">Payment:</span>{" "}
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                    team.paymentStatus == "paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {team.paymentStatus}
                </span>
              </div>
              <div>
                <span className="font-medium">Submission:</span>{" "}
                {team.submissionLink ? (
                  <button
                    onClick={() =>
                      setPreviewUrl(
                        `${process.env.NEXT_PUBLIC_CLIENT_PUBLIC_URL}${team.submissionLink}`
                      )
                    }
                    className="text-blue-600 underline"
                  >
                    View
                  </button>
                ) : (
                  <span className="text-red-500">No Submission</span>
                )}
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                className="flex-1 rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
                onClick={() => {
                  setEditData(team);
                  setShowForm(true);
                }}
              >
                <Pencil size={14} className="inline-block mr-1" />
                Edit
              </button>
              <button
                className="flex-1 rounded bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
                onClick={() => handleDelete(team.id)}
              >
                <Trash2 size={14} className="inline-block mr-1" />
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-md mb-2 font-medium">Member in this Team</h3>
          {team && (
            <button
              onClick={handleAddMemberClick}
              className="flex items-center gap-2 rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
            >
              <Plus size={16} /> Add Member
            </button>
          )}
        </div>
        <div className="mt-6 overflow-x-auto rounded-lg bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200 text-sm md:table hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Instution
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {!members || members?.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="whitespace-nowrap px-6 py-4 text-center"
                  >
                    No Member
                  </td>
                </tr>
              ) : (
                members?.map((m: Member, idx: number) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {m.fullName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {m.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {m.institution}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {m.roleInTeam}
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-gray-900 space-x-2">
                      {m.roleInTeam === "Leader" ? (
                        <button
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => {
                            setEditDataMember(m);
                            setShowFormMember(true);
                          }}
                        >
                          <Pencil size={16} />
                        </button>
                      ) : (
                        <>
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            onClick={() => {
                              setEditDataMember(m);
                              setShowFormMember(true);
                            }}
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDelete(team.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:hidden space-y-4">
        {!members ? (
          <div className="rounded border p-4 text-center text-sm text-gray-500">
            Data not found
          </div>
        ) : (
          members?.map((m: Member, idx: number) => (
            <div className="rounded border p-4 shadow" key={idx}>
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-sm font-semibold">{m.fullName}</div>
                  <div className="text-xs text-gray-500">{m.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 text-sm text-gray-700">
                <div>
                  <span className="font-medium">Institution:</span>{" "}
                  {m.institution}
                </div>
                <div>
                  <span className="font-medium">Role in Team:</span>{" "}
                  {m.roleInTeam}
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                {m.roleInTeam === "Leader" ? (
                  <button
                    className="flex-1 rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
                    onClick={() => {
                      setEditDataMember(m);
                      setShowForm(true);
                    }}
                  >
                    <Pencil size={14} className="inline-block mr-1" />
                    Edit
                  </button>
                ) : (
                  <>
                    <button
                      className="flex-1 rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
                      onClick={() => {
                        setEditDataMember(m);
                        setShowFormMember(true);
                      }}
                    >
                      <Pencil size={16} className="inline-block mr-1" />
                      Edit
                    </button>
                    <button
                      className="flex-1 rounded bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
                      onClick={() => handleDelete(team.id)}
                    >
                      <Trash2 size={16} className="inline-block mr-1" />
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

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
                setShowForm(false);

                const shouldPay = await confirm({
                  title: "Continue to Payment?",
                  description:
                    "The team has been added. Would you like to proceed directly to the payment process?",
                  confirmText: "Pay now",
                  // cancelText: "Later",
                });

                if (shouldPay) {
                  router.push(`/user/payment`);
                }
              }
              await mutate(`/v1/teams?&search=${searchQuery}`);
              setShowForm(false);
            } catch (err) {
              handleAxiosError(err);
            }
          }}
        />
      )}

      {showFormMember && (
        <AddMemberToTeam
          initialData={editDataMember || undefined}
          teamId={team.id}
          onClose={() => setShowFormMember(false)}
          onSubmit={async (formData) => {
            try {
              if (editDataMember?.id) {
                await clientAxios.put(
                  `/v1/team-members/${editDataMember?.id}`,
                  formData
                );
                toast({ title: "Member updated successfully" });
              } else {
                await clientAxios.post(`/v1/team-members`, {
                  ...formData,
                  teamId: team.id,
                });
                toast({ title: "Member added successfully" });
              }
              await mutate(`/v1/team-members/${team.id}`);
              setShowFormMember(false);
            } catch (err) {
              handleAxiosError(err);
            }
          }}
        />
      )}

      {showFormSubmission && (
        <SubmissionForm
          onClose={() => setShowFormSubmission(false)}
          onSubmit={async (formData) => {
            // console.log("Submit speaker", formData);
            try {
              await clientAxios.post("/v1/teams/submission", formData);

              toast({
                title: `Upload submission successfully.`,
              });

              await mutate(`/v1/teams?&search=${searchQuery}`);
              setShowFormSubmission(false);
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
