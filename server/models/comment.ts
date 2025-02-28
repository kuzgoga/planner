import { z } from "zod";

export const Comment = z.object({
  id: z.number().min(1),
  content: z.string().max(1024),
  authorId: z.number().min(1),
  eventId: z.number().min(1),
});
