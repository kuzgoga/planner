import { H3Event } from "h3";

import { Event } from "../../../entities/event.entity";

async function leaveEvent(event: H3Event): Promise<void> {
  const session = await requireUserSession(event);
  const eventId = getRouterParam(event, "id");

  if (!eventId) {
    createError({ statusCode: 400, statusMessage: "Invalid event ID" });
    return;
  }

  const currentEvent = await Event.findOneBy({ id: parseInt(eventId) });

  if (!currentEvent) {
    createError({ statusCode: 404, statusMessage: "Event not found" });
    return;
  }

  const newParticipant = await User.findOneBy({ id: session.user.id });

  if (!newParticipant) {
    createError({ statusCode: 404, statusMessage: "User not found" });
    return;
  }

  if (currentEvent.participants) {
    currentEvent.participants = currentEvent.participants.filter(
      (participant) => participant.id !== session.user.id,
    );
  }

  await currentEvent.save();
}

export default createTypedRoute(leaveEvent);
