import { z } from "zod";

const EventSchema = z.object({
  id: z.number().min(1),
  title: z.string().min(2).max(128),
  description: z.string().max(1024),
  location: z.string().max(128),
  startDate: z.date(),
  endDate: z.date(),
  organizersIds: z.array(z.number().min(1)),
});

export type Event = z.infer<typeof EventSchema>;
