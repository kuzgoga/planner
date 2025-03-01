import { getIdFromEvent } from "../../utils/extract_id_query_param";
import { Event } from "../../entities/event.entity";
import { Equal } from "typeorm";
import { GetEventByIdResponse } from "~/server/models/events_routes";
import { requireOrganizerRole } from "../../utils/require_organizer_role";
import { H3Event, EventHandlerRequest } from "h3";
import { createTypedRoute } from "../../utils/typed_route";

async function defineEventHandler(
  event: H3Event,
): Promise<GetEventByIdResponse> {
  requireOrganizerRole(event);
  const eventId = getIdFromEvent(event);

  const requestedEvent = await Event.findOne({
    relations: { participants: false },
    where: { id: Equal(eventId) },
  });

  if (!requestedEvent) {
    throw createError({
      statusCode: 404,
      statusMessage: "Событие не найдено",
    });
  }
  return requestedEvent;
}

export default createTypedRoute(defineEventHandler);
