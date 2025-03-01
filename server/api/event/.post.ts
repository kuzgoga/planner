import {
  EventCreateResponseSchema,
  EventSchema,
} from "../../models/events_routes";
import { Event } from "../../entities/event.entity";
import { EventCreateResponse } from "../../models/events_routes";
import { requireOrganizerRole } from "../../utils/require_organizer_role";
import { In } from "typeorm";
import { validateRequest } from "../../utils/validate_request";
import { H3Event, EventHandlerRequest } from "h3";
import { createTypedRoute } from "../../utils/typed_route";
import { EventCreateRequestSchema } from "../../models/events_routes";
import { ref } from "vue";

async function defineEventHandler(
  serverEvent: H3Event,
): Promise<EventCreateResponse> {
  //requireOrganizerRole(serverEvent);
  const event = await validateRequest(serverEvent, EventCreateRequestSchema);

  const participants = await User.findBy({ id: In(event.participants) });

  const newEvent = Event.create({
    title: event.title,
    description: event.description,
    preview_path: event.preview_path,
    start: event.start,
    end: event.end,
    participants: participants,
    location: event.location,
  });
  await newEvent.save();

  return {
    id: newEvent.id,
    title: newEvent.title,
    description: newEvent.description,
    preview_path: newEvent.preview_path,
    start: newEvent.start.toString(),
    end: newEvent.end.toString(),
    participants: newEvent.participants.map((user) => user.id),
    likes: newEvent.likes,
    location: newEvent.location,
  };
}

export default createTypedRoute(defineEventHandler);
