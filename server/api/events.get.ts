import { H3Event, EventHandlerRequest, use } from "h3";
import { createTypedRoute } from "../utils/typed_route";
import {
  GetFutureEventsResponse,
  GroupedEvents,
  Month,
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
    const date = new Date(event.start);
    const month = date
      .toLocaleString(locale, { month: "short" })
      .substring(0, 3)
      .toUpperCase() as Month;
    const day = date.getDate();

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
