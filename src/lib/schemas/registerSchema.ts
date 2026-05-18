import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(6, { error: "Password must have >=6 characters" }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
