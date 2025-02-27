import { z } from "zod";

export const userSchema = z.object({
  name: z.string().default("Guest"),
  email: z.string().email(),
});
