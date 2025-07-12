"use client";

import FormInput from "@/components/frontend/FormInput";
import { toast } from "@/hooks/use-toast";
import { memberSchema } from "@/schemas/memberSchema";
import { X } from "lucide-react";
import { useState } from "react";

type Props = {
  teamId: string;
  onClose: () => void;
  onSubmit: (data: {
    fullName: string;
    email: string;
    institution: string;
    roleInTeam: string;
  }) => void;
};

interface Member {
  teamId?: string;
  id?: string;
  fullName: string;
  email: string;
  institution: string;
  roleInTeam: string;
}

export default function AddMemberToTeam({ teamId, onClose, onSubmit }: Props) {
  const [member, setMember] = useState<Member>({
    fullName: "",
    email: "",
    institution: "",
    roleInTeam: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!member) return;
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = memberSchema.safeParse(member);
    if (!result.success) {
      result.error.errors.forEach((err) => {
        toast({
          title: `${err.path[0]}: ${err.message}`,
          variant: "destructive",
        });
      });
      return;
    }

    const jsonBody = {
      ...member,
      teamId: teamId,
    };
    onSubmit(jsonBody);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow">
        <h2 className="mb-2 text-lg font-semibold">Add Member to Team</h2>

        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

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

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
