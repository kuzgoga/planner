import { EventCreateSchema } from "../../models/create_event";
import { Event } from "../../entities/event.entity";
import { EventCreateResponse } from "../../models/create_event";

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (body) =>
    EventCreateSchema.safeParse(body),
  );

  if (!result.success) throw result.error.issues;

  const eventData = result.data;

  const participants = await User.findByIds(eventData.userIds);

  const newEvent = Event.create({
    title: eventData.title,
    description: eventData.description,
    preview_path: eventData.preview_path,
    start: eventData.start,
    end: eventData.end,
    participants: participants,
  });

  await newEvent.save();

  const res: EventCreateResponse = {};

  return res;
});
