import { z } from "zod";

export const LoginRequestSchema = z.object({
  email: z.string().email({ message: "Please enter a valid E-Mail address." }),
  password: z.string().min(8, { message: "Please enter a password." }).max(128),
});
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type LoginResponse = {};
