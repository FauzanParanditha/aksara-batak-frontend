"use client";

import { toast } from "@/hooks/use-toast";
import { X } from "lucide-react";
import { useState } from "react";

interface ScoreItem {
  criteria: string;
  label: string;
}

const scoreCriteria: ScoreItem[] = [
  { criteria: "usefulness_and_relevance", label: "Usefulness & Relevance" },
  { criteria: "design_and_user_experience", label: "Design & User Experience" },
  {
    criteria: "performance_and_technical_stability",
    label: "Performance & Technical Stability",
  },
  {
    criteria: "innovation_and_differentiation",
    label: "Innovation & Differentiation",
  },
  {
    criteria: "impact_and_scalability_potential",
    label: "Impact & Scalability Potential",
  },
];

interface JudgeScoreFormProps {
  teamName: string;
  onSubmit: (data: {
    scores: { [key: string]: number };
    comments: string;
  }) => void;
  onClose: () => void;
}

export default function JudgeScoreForm({
  teamName,
  onSubmit,
  onClose,
}: JudgeScoreFormProps) {
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [comments, setComments] = useState("");

  const handleScoreChange = (criteria: string, value: number) => {
    setScores((prev) => ({ ...prev, [criteria]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    for (const { criteria } of scoreCriteria) {
      const score = scores[criteria];
      if (score == null || score < 0 || score > 10) {
        return toast({
          title: "Error",
          description: `Please provide valid score (0–10) for ${criteria}`,
          variant: "destructive",
        });
      }
    }
    onSubmit({ scores, comments });
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30 p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-lg bg-white p-6 shadow">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        <h2 className="mb-4 text-xl font-semibold">
          Penilaian Tim: {teamName}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {scoreCriteria.map(({ criteria, label }) => (
            <div key={criteria}>
              <label className="block font-medium mb-1">{label}</label>
              <input
                type="number"
                min={0}
                max={10}
                step={0.1}
                value={scores[criteria] ?? ""}
                onChange={(e) =>
                  handleScoreChange(criteria, parseFloat(e.target.value))
                }
                required
                className="w-full rounded border px-3 py-2 text-sm shadow focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
          ))}
          <div>
            <label className="block font-medium mb-1">Comment</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={4}
              className="w-full rounded border px-3 py-2 text-sm shadow focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Comment for this team....."
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Submit Score
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
