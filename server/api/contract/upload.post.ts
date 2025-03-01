import { H3Event, EventHandlerRequest } from "h3";
import { ServerFile } from "nuxt-file-storage";
import { Contract } from "~/server/entities/contract.entity";
import { Event } from "~/server/entities/event.entity";

async function uploadContract(event: H3Event): Promise<string> {
  const { title, initiator_id, event_id, files } = await readBody<{
    title: string;
    initiator_id: string;
    event_id: string;
    files: ServerFile[];
  }>(event);

  const initiator = await User.findOneBy({ id: parseInt(initiator_id) });
  if (!initiator) {
    throw createError({
      statusCode: 404,
      statusMessage: "Initiator not found",
    });
  }

  const attached_event = await Event.findOneBy({ id: parseInt(event_id) });
  if (!attached_event) {
    throw createError({ statusCode: 404, statusMessage: "Event not found" });
  }

  if (!files || files.length === 0) {
    throw createError({ statusCode: 400, statusMessage: "No files provided" });
  }

  if (files.length > 1) {
    throw createError({ statusCode: 400, statusMessage: "Too many files" });
  }

  const filepath = await storeFileLocally(files[0], 10, "/contracts");

  const contract = Contract.create({
    title: title,
    initiator: initiator,
    event: attached_event,
    filepath: `contracts/${filepath}`,
  });

  await contract.save();

  return filepath;
}

export default createTypedRoute(uploadContract);
