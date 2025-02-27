import { z } from "zod";

export interface User {
  id: string;
  email: string;
  name: string;
}

export const userSchema = z.object({
  name: z.string().default("Guest"),
  email: z.string().email(),
});
