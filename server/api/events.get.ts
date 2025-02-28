import { H3Event, EventHandlerRequest } from "h3";
import { createTypedRoute } from "../utils/typed_route";
import { GetAllEventsResponse, GroupedEvents } from "../models/events_routes";
import { Event } from "../entities/event.entity";

async function getAllEvents(events: H3Event): Promise<GetAllEventsResponse> {
  const items = await Event.find();

  const groupedEvents: GroupedEvents = items.reduce((acc, event) => {
    const month = new Date(event.start).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(event);
    return acc;
  }, {} as GroupedEvents);

  return groupedEvents;
}

export default createTypedRoute(getAllEvents);
