import { H3Event, EventHandlerRequest } from "h3";
import { Event } from "~/server/entities/event.entity";
import { User } from "#imports";
import { GetAllManagedEventsResponse } from "~/server/models/events_routes";

async function getAllManagedEvents(
  event: H3Event,
): Promise<GetAllManagedEventsResponse> {
  requireAdminRole(event);
  const { user: userSession } = await requireUserSession(event);
  const userModel = await User.findOne({ where: { id: userSession.id } });
  if (!userModel) {
    throw createError({ statusCode: 404, statusMessage: "User not found" });
  }
  const managedEvents = await Event.find({
    relations: { participants: true },
    where: { participants: { id: userModel.id } },
  });

  const participantsIds = managedEvents?.map((user) => user.id) ?? [];
  return managedEvents.map((event) => ({
    id: event.id,
    title: event.title,
    description: event.description,
    preview_path: event.preview_path,
    location: event.location,
    start: event.start.toString(),
    end: event.end.toString(),
    likes: event.likes || [],
    participants: event.participants.map((participant) => participant.id),
  }));
}

export default createTypedRoute(getAllManagedEvents);
