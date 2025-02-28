import { z } from "zod";

const FindUserRequest = z.object({
  keyphrase: z.string().max(128),
});

const FindUserSchema = z.object({
  id: z.number().min(1),
});
