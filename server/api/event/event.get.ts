import { getIdFromEvent } from "../../utils/extract_id_query_param";
import { Event } from "../../entities/event.entity";
import { Equal } from "typeorm";
import { GetEventByIdResponse } from "~/server/models/get_event_by_id";
import { requireOrganizerRole } from "../../utils/require_organizer_role";

export default defineEventHandler(async (event) => {
  requireOrganizerRole(event);
  const eventId = getIdFromEvent(event);

  const requestedEvent = await Event.findOne({
    where: { id: Equal(eventId) },
  });

  if (!requestedEvent) {
    throw createError({
      statusCode: 404,
      statusMessage: "Событие не найдено",
    });
  }
  const res: GetEventByIdResponse = requestedEvent;
  return res;
});
