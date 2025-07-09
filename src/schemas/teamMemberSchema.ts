import { z } from "zod";

export const createTeamMemberSchema = z.object({
  fullName: z
    .string()
    .min(3, "Nama lengkap minimal 3 karakter")
    .max(100, "Nama lengkap maksimal 100 karakter")
    .trim(),

  email: z
    .string()
    .email("Format email tidak valid")
    .max(100, "Email terlalu panjang"),

  institution: z.string(),
  roleInTeam: z.string(),
});

export type TeamMemberSchemaType = z.infer<typeof createTeamMemberSchema>;
