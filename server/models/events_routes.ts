import { z } from "zod";
import { Event } from "../entities/event.entity";

export const EventSchema = z.object({
  id: z.number().min(1),
  title: z.string().min(2).max(100),
  description: z.string().min(2).max(1000),
  preview_path: z.string().min(2).max(1000),
  location: z.string().min(2).max(1000),
  start: z.string().datetime(),
  end: z.string().datetime(),
  likes: z.array(z.number().min(1)),
  participants: z.array(z.number().min(1)),
});

export const EventCreateRequestSchema = EventSchema.omit({
  id: true,
  likes: true,
});
export type EventCreateRequest = z.infer<typeof EventCreateRequestSchema>;
export const EventCreateResponseSchema = EventSchema.omit({});
export type EventCreateResponse = z.infer<typeof EventCreateResponseSchema>;

export const EventUpdateSchema = EventSchema.partial();
export type EventUpdate = z.infer<typeof EventUpdateSchema>;
export type EventUpdateResponse = Event;

export type GetEventByIdResponse = Event;

export interface GroupedEvents {
  [key: string]: {
    [key: number]: Event[];
  };
}

export type GetFutureEventsResponse = GroupedEvents;

export type DeleteEventResponse = void;
