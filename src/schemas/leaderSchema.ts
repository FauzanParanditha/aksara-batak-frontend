import { z } from "zod";

export const createUserSchema = z.object({
  fullName: z
    .string()
    .min(3, "Nama lengkap minimal 3 karakter")
    .max(100, "Nama lengkap maksimal 100 karakter")
    .trim(),

  email: z
    .string()
    .email("Format email tidak valid")
    .max(100, "Email terlalu panjang"),

  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .max(100, "Password terlalu panjang")
    .regex(/[a-z]/, "Password harus mengandung huruf kecil")
    .regex(/[A-Z]/, "Password harus mengandung huruf besar")
    .regex(/[0-9]/, "Password harus mengandung angka")
    .regex(/[^a-zA-Z0-9]/, "Password harus mengandung simbol"),

  phone: z.string().regex(/^\+?\d{9,15}$/, "Nomor telepon tidak valid"),

  role: z.enum(["admin", "leader"]).default("leader"),
});

export type UserSchemaType = z.infer<typeof createUserSchema>;
