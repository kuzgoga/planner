import { H3Event } from "h3";
import { UserSession } from "../models/user_session";

export async function requireOrganizerRole(event: H3Event) {
  const user = await requireUserSession(event);

  if (user.role !== "ORGANIZER") {
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden",
      message: "Вам не разрешено выполнить это действие.",
    });
  }

  return user;
}
