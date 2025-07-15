"use client";

import FormInput from "@/components/frontend/FormInput";
import FormSelect from "@/components/frontend/FormSelect";
import { toast } from "@/hooks/use-toast";
import { memberSchema } from "@/schemas/memberSchema";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  initialData?: {
    id?: string;
    fullName: string;
    email: string;
    institution: string;
    roleInTeam: string;
    phone?: string;
    address?: string;
  };
  teamId: string;
  onClose: () => void;
  onSubmit: (data: {
    fullName: string;
    email: string;
    institution: string;
    roleInTeam: string;
    phone?: string;
    address?: string;
  }) => void;
};

interface Member {
  teamId?: string;
  id?: string;
  fullName: string;
  email: string;
  institution: string;
  roleInTeam: string;
  phone?: string;
  address?: string;
}

export default function AddMemberToTeam({
  initialData,
  teamId,
  onClose,
  onSubmit,
}: Props) {
  const [member, setMember] = useState<Member>({
    fullName: "",
    email: "",
    institution: "",
    roleInTeam: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (initialData) {
      setMember({
        fullName: initialData.fullName || "",
        email: initialData.email || "",
        institution: initialData.institution || "",
        roleInTeam: initialData.roleInTeam || "",
        phone: initialData.phone || "",
        address: initialData.address || "",
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!member) return;
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!teamId) {
      toast({ title: "Team ID not found", variant: "destructive" });
      return;
    }

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
        <h2 className="mb-2 text-lg font-semibold">
          {initialData ? "Update Member" : "Add Member"}
        </h2>

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
              value={member.fullName}
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
              value={member.email}
              placeholder="Enter member email"
              onChange={handleChange}
              className="w-full rounded border p-2"
            />
          </div>
          <div>
            <FormSelect
              label="Institution"
              name="institution"
              value={member.institution}
              onChange={handleChange}
              options={[
                {
                  label: "University/College",
                  value: "university_college",
                },
                {
                  label: "Technology Companies/Startups",
                  value: "technology_companies_startups",
                },
                {
                  label: "Government / Ministry / SOE",
                  value: "government_ministry_soe",
                },
                {
                  label: "Technology Community / Developer Community",
                  value: "technology_community_developer_community",
                },
                {
                  label: "Vocational High School / IT High School",
                  value: "vocational_high_school_it_high_school",
                },
                {
                  label: "Incubator / Accelerator Institution",
                  value: "incubator_accelerator_institution",
                },
                {
                  label: "Non-profit Organization / NGO / Digital Foundation",
                  value: "non_profit_organization_ngo_digital_foundation",
                },
                {
                  label: "Other",
                  value: "other",
                },
              ]}
              required
            />
          </div>
          <div>
            <FormInput
              label="Role in Team"
              name="roleInTeam"
              type="text"
              value={member.roleInTeam}
              placeholder="Enter role in team"
              onChange={handleChange}
              className="w-full rounded border p-2"
            />
          </div>
          <div>
            <FormInput
              label="Phone"
              name="phone"
              type="text"
              value={member.phone}
              placeholder="Enter phone number"
              onChange={handleChange}
              className="w-full rounded border p-2"
            />
          </div>
          <div>
            <FormInput
              label="Address"
              name="address"
              type="text"
              value={member.address}
              placeholder="Enter address"
              onChange={handleChange}
              className="w-full rounded border p-2"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              {initialData ? "Update Member" : "Add Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
