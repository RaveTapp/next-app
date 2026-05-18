import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, { error: "Password must have >=6 characters" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
