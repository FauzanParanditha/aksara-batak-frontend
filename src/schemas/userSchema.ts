import { z } from "zod";

export const updateUserSchema = z.object({
  fullName: z
    .string()
    .min(3, "Nama lengkap minimal 3 karakter")
    .max(100, "Nama lengkap maksimal 100 karakter")
    .trim(),

  email: z
    .string()
    .email("Format email tidak valid")
    .max(100, "Email terlalu panjang"),

  phone: z.string().regex(/^\+?\d{9,15}$/, "Nomor telepon tidak valid"),
  role: z.enum(["leader", "admin"]),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Password saat ini minimal 8 karakter")
      .max(100, "Password terlalu panjang"),

    newPassword: z
      .string()
      .min(8, "Password baru minimal 8 karakter")
      .max(100, "Password terlalu panjang")
      .regex(/[a-z]/, "Password baru harus mengandung huruf kecil")
      .regex(/[A-Z]/, "Password baru harus mengandung huruf besar")
      .regex(/[0-9]/, "Password baru harus mengandung angka")
      .regex(/[^a-zA-Z0-9]/, "Password baru harus mengandung simbol"),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "Password baru tidak boleh sama dengan password saat ini",
    path: ["newPassword"],
  });

export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
