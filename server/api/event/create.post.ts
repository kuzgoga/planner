import { EventCreateSchema } from "../../models/create_event";
import { Event } from "../../entities/event.entity";

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (body) =>
    EventCreateSchema.safeParse(body),
  );

  if (!result.success) throw result.error.issues;

  const eventData = result.data;
});
