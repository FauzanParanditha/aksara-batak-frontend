"use client";

import FormInput from "@/components/frontend/FormInput";
import { toast } from "@/hooks/use-toast";
import clientAxios from "@/lib/axios/client";
import { useHandleAxiosError } from "@/lib/handleError";
import {
  ChangePasswordFormValues,
  changePasswordSchema,
} from "@/schemas/userSchema";
import { logout } from "@/service/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function PasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
  });
  const handleAxiosError = useHandleAxiosError();

  const onSubmit = async (data: ChangePasswordFormValues) => {
    try {
      const res = await clientAxios.post("/v1/users/me/change-password", data);

      if (res.status === 200) {
        toast({
          title: "Password changed successfully",
        });
        reset();
        logout();
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block font-medium">Current Password</label>
        <FormInput
          type="password"
          {...register("currentPassword")}
          className="w-full border rounded px-3 py-2"
        />
        {errors.currentPassword && (
          <p className="text-sm text-red-500">
            {errors.currentPassword.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-medium">New Password</label>
        <FormInput
          type="password"
          {...register("newPassword")}
          className="w-full border rounded px-3 py-2"
        />
        {errors.newPassword && (
          <p className="text-sm text-red-500">{errors.newPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white rounded px-4 py-2"
      >
        Change Password
      </button>
    </form>
  );
}
