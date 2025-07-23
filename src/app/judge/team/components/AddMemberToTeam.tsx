"use client";

import { useConfirmDialog } from "@/components/ConfirmDialogProvider";
import FormInput from "@/components/frontend/FormInput";
import FullScreenLoader from "@/components/frontend/FullScreenLoader";
import { toast } from "@/hooks/use-toast";
import clientAxios from "@/lib/axios/client";
import { useHandleAxiosError } from "@/lib/handleError";
import { useState } from "react";
import useSWR, { mutate } from "swr";

type Props = {
  teamId: string;
};

interface Member {
  teamId?: string;
  id?: string;
  fullName: string;
  email: string;
  institution: string;
  roleInTeam: string;
}

export default function AddMemberToTeam({ teamId }: Props) {
  const [member, setMember] = useState<Member>({
    fullName: "",
    email: "",
    institution: "",
    roleInTeam: "",
  });
  const handleAxiosError = useHandleAxiosError();
  const [loading, setLoading] = useState(false);
  const confirm = useConfirmDialog();

  const { data: members } = useSWR(`/v1/team-members/${teamId}`);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!member) return;
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = {
        ...member,
        teamId: teamId,
      };
      const res = await clientAxios.post(`/v1/team-members`, body);

      if (res.status !== 201) {
        toast({
          title: "Failed to add member",
        });
      }

      toast({
        title: "Member added successfully",
      });
      setMember({
        fullName: "",
        email: "",
        institution: "",
        roleInTeam: "",
      });
      mutate(`/v1/team-members/${teamId}`); // Revalidate the members data
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirm({
      title: "Delete Member?",
      description:
        "Are you sure you want to delete this member? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
    });
    if (!isConfirmed) return;
    setLoading(true);
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
        mutate(`/v1/team-members/${teamId}`); // Revalidate the members data
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  if (!members || loading) {
    return <FullScreenLoader />;
  }

  return (
    <div className="mt-8 rounded border border-slate-300 bg-white p-4 shadow">
      <h2 className="mb-2 text-lg font-semibold">Add Member to Session</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <FormInput
            label="Full Name"
            name="fullName"
            type="text"
            placeholder="Enter member name"
            onChange={handleChange}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="Enter member email"
            onChange={handleChange}
            className="w-full rounded border p-2"
          />
        </div>
        <div>
          <FormInput
            label="Institution"
            name="institution"
            type="text"
            placeholder="Enter institution"
            onChange={handleChange}
            className="w-full rounded border p-2"
          />
        </div>
        <div>
          <FormInput
            label="Role in Team"
            name="roleInTeam"
            type="text"
            placeholder="Enter role in team"
            onChange={handleChange}
            className="w-full rounded border p-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? <FullScreenLoader /> : "Add Member"}
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-md mb-2 font-medium">Member in this Team</h3>
        <table className="min-w-full divide-y divide-gray-200">
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
          <tbody className="divide-y divide-gray-100">
            {members.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No Member
                </td>
              </tr>
            ) : (
              members.map((m: Member, idx: number) => (
                <tr key={idx}>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {m.fullName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{m.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {m.institution}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {m.roleInTeam}
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-900">
                    {/* Action buttons */}
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(m.id || "")}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* {showForm && (
        <SessionSpeakerForm
          initialData={editData || undefined}
          onClose={() => setShowForm(false)}
          onSubmit={async (formData) => {
            // console.log("Submit speaker", formData);
            try {
              await clientAxios.put(
                `/v1/session-speaker/${editData?.sessionId}/${editData?.speakerId}`,
                formData
              );
              toast.success("Successfully edited session speaker");

              await mutate();
              setShowForm(false);
            } catch (err) {
              handleAxiosError(err);
            }
          }}
        />
      )} */}
    </div>
  );
}
