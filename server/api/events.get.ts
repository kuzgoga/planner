import { H3Event, EventHandlerRequest, use } from "h3";
import { createTypedRoute } from "../utils/typed_route";
import {
  GetFutureEventsResponse,
  GroupedEvents,
} from "../models/events_routes";
import { Event } from "../entities/event.entity";
import { User } from "../entities/user.entity";

async function getFutureEvents(
  events: H3Event,
): Promise<GetFutureEventsResponse> {
  const session = await requireUserSession(events);

  const items = await Event.find({
    relations: { participants: false },
    where: {
      participants: {
        id: session.user.id,
      },
    },
    order: {
      start: "ASC",
    },
  });

  const locale = "ru-RU";
  const groupedEvents: GroupedEvents = items.reduce((acc, event) => {
    const month = new Date(event.start).toLocaleString(locale, {
      month: "long",
      year: "numeric",
    });
    const day = new Date(event.start).getDay();

    if (!acc[month]) {
      acc[month] = {};
    }
    if (!acc[month][day]) {
      acc[month][day] = [];
    }
    acc[month][day].push(event);
    return acc;
  }, {} as GroupedEvents);

  return groupedEvents;
}

export default createTypedRoute(getFutureEvents);
