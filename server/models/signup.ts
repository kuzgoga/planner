import { z } from "zod";

export const SignUpRequestSchema = z.object({
  firstName: z.string().min(2, { message: "Введите имя" }).max(128),
  lastName: z.string().min(2, { message: "Введите фамилию" }).max(128),
  email: z.string().email({ message: "Введите email" }),
  password: z.string().min(8, { message: "Введите пароль" }).max(128),
});

export type SignUpRequest = z.infer<typeof SignUpRequestSchema>;

export type SignUpResponse = {
  userId: number;
};
