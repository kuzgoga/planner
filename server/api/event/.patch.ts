import {
  EventCreateSchema,
  EventUpdateResponse,
} from "../../models/create_event";
import { Event } from "../../entities/event.entity";
import { EventUpdateSchema } from "../../models/create_event";
import { requireOrganizerRole } from "../../utils/require_organizer_role";
import { In } from "typeorm";
import { validateRequest } from "../../utils/validate_request";

export default defineEventHandler(async (serverEvent) => {
  requireOrganizerRole(serverEvent);
  const event = await validateRequest(serverEvent, EventUpdateSchema);

  let participants;
  if (!event.participants) {
    participants = await User.findBy({ id: In(event.participants!) });
  }

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

  const res: EventUpdateResponse = newEvent;

  return res;
});
