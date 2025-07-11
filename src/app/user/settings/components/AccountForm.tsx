"use client";

import FormInput from "@/components/frontend/FormInput";
import FullScreenLoader from "@/components/frontend/FullScreenLoader";
import { toast } from "@/hooks/use-toast";
import clientAxios from "@/lib/axios/client";
import { useHandleAxiosError } from "@/lib/handleError";
import { UpdateUserFormValues, updateUserSchema } from "@/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

export default function AccountForm() {
  const { data: userData, isLoading } = useSWR("/v1/users/me");
  const handleAxiosError = useHandleAxiosError();
  const form = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      role: undefined,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  useEffect(() => {
    if (userData) {
      reset({
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        role: userData.role,
      });
    }
  }, [userData, reset]);

  if (isLoading) return <FullScreenLoader />;

  const onSubmit = async (data: UpdateUserFormValues) => {
    try {
      const res = await clientAxios.put(`/v1/users/${userData?.id}`, data);

      if (res.status === 200) {
        toast({
          title: "Profile updated successfully",
        });
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block font-medium">Full Name</label>
        <FormInput
          {...register("fullName")}
          placeholder="Your full name"
          className="w-full border rounded px-3 py-2"
        />
        {errors.fullName && (
          <p className="text-sm text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Email</label>
        <FormInput
          type="email"
          {...register("email")}
          className="w-full border rounded px-3 py-2"
          readOnly
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Phone</label>
        <FormInput
          {...register("phone")}
          className="w-full border rounded px-3 py-2"
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Role</label>
        <FormInput
          {...register("role")}
          className="w-full border rounded px-3 py-2"
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2"
      >
        Update Profile
      </button>
    </form>
  );
}
