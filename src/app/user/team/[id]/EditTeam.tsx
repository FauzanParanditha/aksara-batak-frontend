"use client";

import FormInput from "@/components/frontend/FormInput";
import FullScreenLoader from "@/components/frontend/FullScreenLoader";
import { toast } from "@/hooks/use-toast";
import clientAxios from "@/lib/axios/client";
import { useHandleAxiosError } from "@/lib/handleError";
import { teamSchema } from "@/schemas/teamSchema";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddMemberToTeam from "../components/AddMemberToTeam";

interface TeamForm {
  id: string;
  teamName: string;
  category: string;
}

export default function EditTeam() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [team, setTeam] = useState<TeamForm | null>(null);
  const [loading, setLoading] = useState(false);
  const handleAxiosError = useHandleAxiosError();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await clientAxios.get(`/v1/teams`);
        setTeam(res.data);
      } catch (err) {
        console.error(err);
        toast({ title: "Failed to load team" });
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!team) return;
    setTeam({ ...team, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = teamSchema.safeParse({
      teamName: team?.teamName,
      category: team?.category,
    });
    if (!result.success) {
      result.error.errors.forEach((err) => {
        toast({ title: `${err.path[0]}: ${err.message}` });
      });
      return;
    }

    setLoading(true);
    if (!team) return;
    try {
      await clientAxios.put(`/v1/teams/${id}`, team);
      toast({ title: "Team updated successfully" });
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
      router.push("/user/team");
    }
  };

  if (loading || !team) {
    return <FullScreenLoader />;
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full rounded-md bg-white p-4 shadow-lg xl:col-span-12">
        <h1 className="mb-4 text-xl font-semibold">Edit Team</h1>
        <div className="border-b-2 border-slate-400 dark:border-red-900"></div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="mb-4 pr-3">
              <FormInput
                label="Team Name"
                type="text"
                name="teamName"
                value={team.teamName}
                onChange={handleChange}
                placeholder="Team Name"
                required
              />
            </div>
            <div className="mb-4 pr-3">
              <FormInput
                label="Category"
                type="category"
                name="email"
                value={team.category}
                onChange={handleChange}
                placeholder="Category"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
        <AddMemberToTeam teamId={id} />
      </div>
    </div>
  );
}
