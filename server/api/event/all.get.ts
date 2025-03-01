import { Event } from "~/server/entities/event.entity";

async function getAllEvents(): Promise<Event[]> {
  const events = await Event.find({ relations: { participants: false } });
  return events;
}

export default defineEventHandler(getAllEvents);
