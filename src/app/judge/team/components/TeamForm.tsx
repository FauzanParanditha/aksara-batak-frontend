"use client";

import FormFileInput from "@/components/frontend/FormFileInput";
import FormInput from "@/components/frontend/FormInput";
import FormSelect from "@/components/frontend/FormSelect";
import { toast } from "@/hooks/use-toast";
import { teamSchema, teamUpdateSchema } from "@/schemas/teamSchema";
import { X } from "lucide-react";
import { useState } from "react";

interface TeamFormProps {
  initialData?: {
    id?: string;
    teamName: string;
    category: string;
    institution: string;
  };
  onSubmit: (data: FormData) => void;
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
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return toast({ title: "Please upload transfer proof." });

    if (initialData) {
      const result = teamUpdateSchema.safeParse({
        teamName,
        category,
      });
      if (!result.success) {
        result.error.errors.forEach((err) => {
          toast({
            description: `${err.path[0]}: ${err.message}`,
            variant: "destructive",
          });
        });
        return;
      }
    } else {
      const result = teamSchema.safeParse({
        teamName,
        category,
        institution,
      });
      if (!result.success) {
        result.error.errors.forEach((err) => {
          toast({
            description: `${err.path[0]}: ${err.message}`,
            variant: "destructive",
          });
        });
        return;
      }
    }

    const formData = new FormData();
    formData.append("teamName", teamName);
    formData.append("category", category);
    if (institution) {
      formData.append("institution", institution);
    }
    formData.append("photo", file);
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30 p-4 overflow-y-auto">
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
            <FormSelect
              label="Category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                {
                  label: "Business Services – ICT Services Solutions",
                  value: "business_service_ict_services_solutions",
                },
                // {
                //   label: "Business Services – Marketing Solutions",
                //   value: "business_services_marketing_solutions",
                // },
                {
                  label: "Business Services – Security Solutions",
                  value: "business_service_security_solutions",
                },
                {
                  label:
                    "Business Services – Finance & Accounting Solutions (Fintech)",
                  value:
                    "business_service_finance_accounting_solutions_fintech",
                },
                {
                  label: "Inclusion & Community Services – Education",
                  value: "inclusion_community_services_education",
                },
                {
                  label:
                    "Inclusion & Community Services – Sustainability & Environment",
                  value:
                    "inclusion_community_services_sustainability_environment",
                },
                {
                  label: "Inclusion & Community Services – Community Services",
                  value: "inclusion_community_services_community_services",
                },
                {
                  label: "Industrial – Agriculture",
                  value: "industrial_agriculture",
                },
                // {
                //   label: "Industrial – Engineering & Construction",
                //   value: "industrial_engineering_construction",
                // },
                {
                  label: "Student – Tertiary Student Project",
                  value: "student_tertiary_student_project",
                },
              ]}
              required
            />
          </div>
          {initialData ? (
            <></>
          ) : (
            <div>
              <FormSelect
                label="Institution"
                name="institution"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
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
          )}
          <div>
            <FormFileInput
              label="Photo"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
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
