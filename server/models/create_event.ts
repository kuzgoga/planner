import { z } from "zod";
import { Event } from "../entities/event.entity";

export const EventCreateSchema = z.object({
  id: z.number().min(1),
  title: z.string().min(2).max(100),
  description: z.string().min(2).max(1000),
  preview_path: z.string().url().min(2).max(1000),
  start: z.date(),
  end: z.date(),
  participants: z.array(z.number().min(1)),
  location: z.string().min(2).max(1000),
});

export type EventCreate = z.infer<typeof EventCreateSchema>;
export type EventCreateResponse = Event;

export const EventUpdateSchema = EventCreateSchema.partial();
export type EventUpdate = z.infer<typeof EventUpdateSchema>;
export type EventUpdateResponse = Event;
