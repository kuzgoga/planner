import { z } from "zod";

export const UserSchema = z.object({
  id: z.number().min(1),
  firstName: z.string().min(2).max(128),
  lastName: z.string().min(2).max(128),
  email: z.string().email().max(128),
  role: z.string().min(2).max(128),
});
export type UserIn = z.infer<typeof UserSchema>;
