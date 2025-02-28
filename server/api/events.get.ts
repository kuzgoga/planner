import { H3Event, EventHandlerRequest } from "h3";
import { createTypedRoute } from "../utils/typed_route";

async function getAllEvents(events: H3Event) {
  // Implementation to fetch all events
}

export default createTypedRoute(getAllEvents);
