import { z } from "zod";

export const memberSchema = z.object({
  fullName: z
    .string()
    .min(3, "Nama lengkap minimal 3 karakter")
    .max(100, "Nama lengkap terlalu panjang")
    .trim(),

  email: z
    .string()
    .email("Format email tidak valid")
    .max(100, "Email terlalu panjang"),

  institution: z
    .string()
    .min(2, "Nama institusi minimal 2 karakter")
    .max(100, "Nama institusi terlalu panjang")
    .trim(),

  roleInTeam: z
    .string()
    .min(2, "Peran dalam tim minimal 2 karakter")
    .max(50, "Peran dalam tim terlalu panjang")
    .trim(),
});
