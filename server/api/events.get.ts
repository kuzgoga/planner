import { H3Event, EventHandlerRequest } from "h3";
import { createTypedRoute } from "../utils/typed_route";
import { GetAllEventsResponse } from "../models/events_routes";
import { Event } from "../entities/event.entity";

async function getAllEvents(events: H3Event): Promise<GetAllEventsResponse> {
  const items = await Event.find();
  return items;
}

export default createTypedRoute(getAllEvents);
