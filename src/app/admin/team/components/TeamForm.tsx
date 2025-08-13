"use client";

import FormInput from "@/components/frontend/FormInput";
import FormSelect from "@/components/frontend/FormSelect";
import { toast } from "@/hooks/use-toast";
import clientAxios from "@/lib/axios/client";
import { teamSchema, teamUpdateSchema } from "@/schemas/teamSchema";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

// --- types ---
interface TeamFormProps {
  initialData?: {
    id?: string;
    teamName: string;
    category: string;
    institution?: string;
  };
  onSubmit: (data: FormData) => void;
  onClose: () => void;
}

interface Judge {
  id: string;
  fullName: string;
  email?: string;
}

interface Criteria {
  key: string;
  label: string;
}

// --- const ---
const criteriaList: Criteria[] = [
  { key: "website_accessibility", label: "Aksesibilitas Website" },
  { key: "platform_stability", label: "Platform Stability" },
  { key: "visual_design", label: "Visual Design" },
  { key: "navigation_responsiveness", label: "Navigation & Responsiveness" },
  { key: "content_weight", label: "Content Weight" },
  { key: "creativity_innovation", label: "Creativity & Innovation" },
  { key: "consistency_relevance", label: "Consistency & Relevance" },
];

export default function TeamForm({
  initialData,
  onSubmit,
  onClose,
}: TeamFormProps) {
  // --- team form states ---
  const [searchQuery, setSearchQuery] = useState("");
  const [teamName, setTeamName] = useState(initialData?.teamName || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [institution, setInstitution] = useState(
    initialData?.institution || ""
  );
  const [file, setFile] = useState<File | null>(null);

  // --- judges data (from /v1/judges) ---
  const [judges, setJudges] = useState<Judge[]>([]);
  const [judgesLoading, setJudgesLoading] = useState(false);
  const [judgesError, setJudgesError] = useState<string | null>(null);

  // --- mass scoring states ---
  const [selectedJudges, setSelectedJudges] = useState<string[]>([]);
  const [scores, setScores] = useState<Record<string, number | undefined>>({});
  const [comment, setComment] = useState("");

  const isEdit = Boolean(initialData?.id);

  useEffect(() => {
    // load judges only when panel is available (edit mode)
    if (!isEdit) return;
    (async () => {
      setJudgesLoading(true);
      setJudgesError(null);
      try {
        const res = await clientAxios.get("/v1/users/judges");
        setJudges(res.data ?? []);
      } catch (err: any) {
        setJudgesError(err?.response?.data?.error || "Failed to fetch judges");
      } finally {
        setJudgesLoading(false);
      }
    })();
  }, [isEdit]);

  // --- helpers ---
  const filledScores = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(scores).filter(
          ([, v]) => typeof v === "number" && Number.isFinite(v as number)
        )
      ),
    [scores]
  );

  const toggleJudge = (id: string) => {
    setSelectedJudges((prev) =>
      prev.includes(id) ? prev.filter((j) => j !== id) : [...prev, id]
    );
  };

  const handleScoreChange = (criteria: string, val: string) => {
    const num = Number(val);
    setScores((prev) => ({
      ...prev,
      [criteria]: Number.isFinite(num) ? num : undefined,
    }));
  };

  // --- submit handlers ---
  const handleSubmitTeam = (e: React.FormEvent) => {
    e.preventDefault();
    // photo required only when create
    if (!isEdit && !file) {
      return toast({ title: "Please upload transfer proof." });
    }

    if (isEdit) {
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
    if (!isEdit && institution) {
      formData.append("institution", institution);
    }
    if (file) {
      formData.append("photo", file);
    }
    onSubmit(formData);
  };

  const handleSubmitMassScore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEdit || !initialData?.id) {
      toast({ title: "Save the team first before scoring." });
      return;
    }
    if (selectedJudges.length === 0) {
      toast({ title: "Pilih minimal 1 juri" });
      return;
    }
    if (Object.keys(filledScores).length === 0) {
      toast({ title: "Isi minimal 1 skor kriteria" });
      return;
    }

    const formData = new FormData();
    formData.append("teamName", teamName);

    try {
      await clientAxios.post(`/v1/scores/multi`, {
        judgeIds: selectedJudges,
        teamId: initialData.id,
        scores: filledScores,
        comments: comment || undefined,
      });
      // toast({ title: "Skor massal berhasil disimpan" });
      // reset mass scoring fields but keep judges (optional)
      setSelectedJudges([]);
      setScores({});
      setComment("");
      onSubmit(formData);
    } catch (err: any) {
      toast({
        title: "Gagal menyimpan skor",
        description: err?.response?.data?.error ?? "Unknown error",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30 p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="mb-4 text-lg font-semibold">
          {isEdit ? "Edit Team" : "Add Team"}
        </h2>

        {/* --- Team form --- */}
        <form onSubmit={handleSubmitTeam} className="space-y-4">
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

          {!isEdit && (
            <div>
              <FormSelect
                label="Institution"
                name="institution"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                options={[
                  {
                    label: "Aksesibilitas Website",
                    value: "website_accessibility",
                  },
                  {
                    label: "Stabilitas & Platform",
                    value: "platform_stability",
                  },
                  {
                    label: "Desain Visual (UI/UX)",
                    value: "visual_design",
                  },
                  {
                    label: "Navigasi & Responsivitas",
                    value: "navigation_responsiveness",
                  },
                  {
                    label: "Bobot & Tema Konten",
                    value: "content_weight",
                  },
                  {
                    label: "Kreativitas & Inovasi",
                    value: "creativity_innovation",
                  },
                  {
                    label: "Konsistensi & Relevansi",
                    value: "consistency_relevance",
                  },
                ]}
                required
              />
            </div>
          )}

          {/* <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              {isEdit ? "Update" : "Create"}
            </button>
          </div> */}
        </form>

        {/* --- Divider --- */}
        {/* {isEdit && <div className="my-6 h-px bg-gray-200" />} */}

        {/* --- Mass Scoring Panel (Admin) --- */}
        {isEdit && (
          <form onSubmit={handleSubmitMassScore} className="space-y-4">
            <h3 className="text-base font-semibold">Isi Skor Massal (Admin)</h3>

            {/* Judges */}
            <div>
              <label className="font-medium">Pilih Juri:</label>
              <div className="mt-2">
                {judgesLoading && (
                  <div className="text-sm text-gray-500">Loading judges…</div>
                )}
                {judgesError && (
                  <div className="text-sm text-red-600">{judgesError}</div>
                )}
                {!judgesLoading && !judgesError && (
                  <div className="grid grid-cols-4 gap-2">
                    {judges.map((j) => (
                      <label key={j.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedJudges.includes(j.id)}
                          onChange={() => toggleJudge(j.id)}
                        />
                        <span className="truncate">
                          {j.fullName}{" "}
                          {j.email ? (
                            <span className="text-xs text-gray-400">
                              ({j.email})
                            </span>
                          ) : null}
                        </span>
                      </label>
                    ))}
                    {judges.length === 0 && (
                      <div className="col-span-2 text-sm text-gray-400">
                        Belum ada user berperan judge
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Scores */}
            <div>
              <label className="font-medium">Skor per Kriteria:</label>
              <div className="mt-2 space-y-2">
                {criteriaList.map((c) => (
                  <div
                    key={c.key}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="text-sm">{c.label}</span>
                    <input
                      type="number"
                      min={0}
                      max={10}
                      step="1"
                      value={
                        Number.isFinite(scores[c.key] as number)
                          ? (scores[c.key] as number)
                          : ""
                      }
                      onChange={(e) => handleScoreChange(c.key, e.target.value)}
                      className="w-24 rounded border px-2 py-1"
                      placeholder="-"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="font-medium">Komentar (opsional):</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-1 w-full rounded border px-3 py-2"
                rows={3}
                placeholder="Catatan sama untuk semua juri yang dipilih"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedJudges([]);
                  setScores({});
                  setComment("");
                }}
                className="rounded border px-4 py-2 hover:bg-gray-50"
              >
                Reset
              </button>
              <button
                type="submit"
                className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
              >
                Simpan Skor Massal
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
