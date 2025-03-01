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
  const _ = requireUserSession(event);
  const eventId = getRouterParam(event, "id");

  if (!eventId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Неверный идентификатор события",
    });
  }

  const requestedEvent = await Event.findOne({
    relations: { participants: true },
    where: { id: Equal(parseInt(eventId)) },
  });

  if (!requestedEvent) {
    throw createError({
      statusCode: 404,
      statusMessage: "Событие не найдено",
    });
  }
  return {
    id: requestedEvent.id,
    title: requestedEvent.title,
    description: requestedEvent.description,
    start: requestedEvent.start.toString(),
    end: requestedEvent.end.toString(),
    location: requestedEvent.location,
    preview_path: requestedEvent.preview_path,
    likes: requestedEvent.likes,
    participants: requestedEvent.participants.map(
      (participant) => participant.id,
    ),
  };
}

export default createTypedRoute(defineEventHandler);
