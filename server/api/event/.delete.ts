// implement delete event
import { H3Event, EventHandlerRequest } from "h3";
import { Event } from "../../entities/event.entity";
import { createTypedRoute } from "../../utils/typed_route";
import { DeleteEventResponse } from "~/server/models/events_routes";

async function deleteEvent(event: H3Event): Promise<DeleteEventResponse> {
  const targetId = getRequiredQueryParam(event, "id", castToNumber);
  const item = await Event.findOneBy({
    id: targetId,
  });

  if (!item) {
    throw createError({ statusCode: 404, statusMessage: "Event not found" });
  }

  await Event.delete(targetId);
}

export default createTypedRoute(deleteEvent);
