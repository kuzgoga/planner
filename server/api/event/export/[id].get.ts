import { H3Event } from "h3";
import { promises as fs } from "fs";
import { Stream } from "stream";
import { Event } from "~/server/entities/event.entity";
import { Readable } from "stream";
import { generateIcsCalendar, type VCalendar, DateObject } from "ts-ics";

async function exportToIcs(event: H3Event): Promise<Readable> {
  const eventId = getRouterParam(event, "id");
  if (!eventId) {
    throw createError({ statusCode: 400, statusMessage: "Invalid event ID" });
  }
  const item = await Event.findOneBy({ id: parseInt(eventId) });
  if (!item) {
    throw createError({ statusCode: 404, statusMessage: "Event not found" });
  }
  const vCalendar = generateIcsCalendar({
    version: "2.0",
    prodId: "-//Planer//EventExport//RU",
    events: [
      {
        uid: item.id.toString(),
        stamp: { date: new Date() },
        start: { date: item.start },
        end: { date: item.end },
        summary: item.title,
        description: item.description,
        location: item.location,
      },
    ],
  });
  setHeaders(event, {
    "Content-Type": "application/octet-stream",
    "Content-Disposition": `attachment; filename="event-${item.id}.ics"`,
  });
  return Readable.from(vCalendar.toString());
}

export default createTypedRoute(exportToIcs);
