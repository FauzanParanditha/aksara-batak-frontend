"use client";

import FormInput from "@/components/frontend/FormInput";
import { toast } from "@/hooks/use-toast";
import { teamSchema } from "@/schemas/teamSchema";
import { X } from "lucide-react";
import { useState } from "react";

interface TeamFormProps {
  initialData?: {
    id?: string;
    teamName: string;
    category: string;
    institution: string;
  };
  onSubmit: (data: {
    teamName: string;
    category: string;
    institution: string;
  }) => void;
  onClose: () => void;
}

export default function TeamForm({
  initialData,
  onSubmit,
  onClose,
}: TeamFormProps) {
  const [teamName, setTeamName] = useState(initialData?.teamName || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [institution, setInstitution] = useState(
    initialData?.institution || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = teamSchema.safeParse({
      teamName,
      category,
      institution,
    });
    if (!result.success) {
      result.error.errors.forEach((err) => {
        toast({
          title: "Add Team Failed",
          description: `${err.path[0]}: ${err.message}`,
          variant: "destructive",
        });
      });
      return;
    }

    const jsonBody = {
      teamName,
      category,
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
          {initialData ? "Edit Team" : "Add Team"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <FormInput
              label="Team Name"
              name="teamName"
              type="text"
              placeholder="Enter team name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </div>
          <div>
            <FormInput
              label="Category"
              name="category"
              type="text"
              placeholder="e.g. Technology, Health, Education"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div>
            <FormInput
              label="Institution"
              name="institution"
              type="text"
              placeholder="e.g. Institution"
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
