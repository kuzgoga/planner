import { z } from "zod";

export const SignUpRequestSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Please enter a first name." })
    .max(128),
  lastName: z
    .string()
    .min(2, { message: "Please enter a last name." })
    .max(128),
  email: z.string().email({ message: "Please enter a valid E-Mail address." }),
  password: z.string().min(8, { message: "Please enter a password." }).max(128),
  role: z.string().min(2, { message: "Please enter a role." }).max(128),
});

export type SignUpRequest = z.infer<typeof SignUpRequestSchema>;

export interface SignUpResponse {
  userId: number;
}

export interface PingResponse {
  message: string;
}

export const LoginRequestSchema = z.object({
  email: z.string().email({ message: "Please enter a valid E-Mail address." }),
  password: z.string().min(8, { message: "Please enter a password." }).max(128),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export interface LoginResponse {}
