"use client";

import FormInput from "@/components/frontend/FormInput";
import FormSelect from "@/components/frontend/FormSelect";
import { createTeamMemberSchema } from "@/schemas/teamMemberSchema";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

interface TeamMemberFormProps {
  initialData?: {
    id?: string;
    teamId: string;
    fullName: string;
    email: string;
    institution: string;
    roleInTeam: string;
  };
  onSubmit: (data: {
    teamId: string;
    fullName: string;
    email: string;
    institution: string;
    roleInTeam: string;
  }) => void;
  onClose: () => void;
}

export default function TeamMemberForm({
  initialData,
  onSubmit,
  onClose,
}: TeamMemberFormProps) {
  const [teamId, setTeamId] = useState(initialData?.teamId || "");
  const [fullName, setFullName] = useState(initialData?.fullName || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [roleInTeam, setRoleInTeam] = useState(initialData?.roleInTeam || "");
  const [institution, setInstitution] = useState(
    initialData?.institution || ""
  );

  const { data: teams, isLoading } = useSWR(`/v1/teams`);
  console.log(teams.data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = createTeamMemberSchema.safeParse({
      fullName,
      email,
      roleInTeam,
      institution,
    });

    if (!result.success) {
      result.error.errors.forEach((err) => {
        toast.error(`${err.path[0]}: ${err.message}`);
      });
      return;
    }

    const jsonBody = {
      teamId,
      fullName,
      email,
      roleInTeam,
      institution,
    };
    onSubmit(jsonBody);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        <h2 className="mb-4 text-lg font-semibold">
          {initialData ? "Edit TeamMember" : "Add TeamMember"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <FormSelect
              label="Team"
              name="teamId"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              options={
                teams?.data?.map((team: any) => ({
                  value: team.id,
                  label: `${team.teamName}`,
                })) || []
              }
              required
            />
          </div>
          <div>
            <FormInput
              label="FullName"
              name="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div>
            <FormInput
              label="Email"
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <FormInput
              label="Role In Team"
              name="roleInTeam"
              type="text"
              value={roleInTeam}
              onChange={(e) => setRoleInTeam(e.target.value)}
              required
            />
          </div>
          <div>
            <FormInput
              label="Institution"
              name="institution"
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
