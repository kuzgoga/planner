// implement delete event
import { H3Event, EventHandlerRequest } from "h3";
import { Event } from "../../entities/event.entity";
import { createTypedRoute } from "../../utils/typed_route";
import { DeleteEventResponse } from "~/server/models/events_routes";

async function deleteEvent(event: H3Event): Promise<DeleteEventResponse> {
  const targetId = getRouterParam(event, "id");
  if (!targetId) {
    throw createError({ statusCode: 400, statusMessage: "Invalid event ID" });
  }
  const item = await Event.findOneBy({
    id: parseInt(targetId),
  });

  if (!item) {
    throw createError({ statusCode: 404, statusMessage: "Event not found" });
  }

  await Event.delete(targetId);
}

export default createTypedRoute(deleteEvent);
