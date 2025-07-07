import { z } from "zod";

export const teamSchema = z.object({
  teamName: z.string().min(6, { message: "Minimal 6 karakter" }),
  category: z.string().min(2, { message: "Minimal 2 karakter" }),
  institution: z.string().min(2, { message: "Minimal 2 karakter" }),
});

export type TeamSchemaType = z.infer<typeof teamSchema>;
