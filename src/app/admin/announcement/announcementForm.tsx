"use client";

import FormSelect from "@/components/frontend/FormSelect";
import FullScreenLoader from "@/components/frontend/FullScreenLoader";
import { toast } from "@/hooks/use-toast";
import clientAxios from "@/lib/axios/client";
import { useHandleAxiosError } from "@/lib/handleError";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type TeamOption = {
  id: string;
  teamName: string;
};

export default function AnnouncementForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    content: "",
    target: "leader",
  });
  const [loading, setLoading] = useState(false);
  const [teamOptions, setTeamOptions] = useState<TeamOption[]>([]);
  const handleAxiosError = useHandleAxiosError();

  useEffect(() => {
    clientAxios
      .get("/v1/teams")
      .then((res) => res.data.data)
      .then((data) => setTeamOptions(data))
      .catch(() => toast({ title: "Gagal memuat data tim" }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await clientAxios.post("/v1/announcements", form);

      if (res.status != 201) throw new Error("Failed to send announcement");
      toast({ title: "Announcement send" });
      router.refresh();
      setForm({ title: "", content: "", target: "leader" });
    } catch (err: any) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  };

  const selectOptions = [
    { value: "leader", label: "Team Leaders" },
    { value: "all", label: "All Members" },
    { value: "", label: "────────── Tim Tertentu ──────────", disabled: true },
    ...teamOptions.map((team) => ({
      value: team.id,
      label: `Tim: ${team.teamName}`,
    })),
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full p-4 bg-white rounded-xl shadow space-y-4"
    >
      <h2 className="text-xl font-semibold">Send Announcement</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          rows={4}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <FormSelect
          label="Target"
          onChange={(e) => setForm({ ...form, target: e.target.value })}
          value={form.target}
          options={selectOptions}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 w-full md:w-fit"
      >
        {loading && <FullScreenLoader />}
        Send Announcement
      </button>
    </form>
  );
}
