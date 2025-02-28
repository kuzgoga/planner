import { z } from "zod";

export const EventCreateSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(2).max(1000),
  date: z.date().min(new Date()),
  userIds: z.array(z.number().min(1)),
});

export type EventCreate = z.infer<typeof EventCreateSchema>;

export type EventCreateResponse = {};
