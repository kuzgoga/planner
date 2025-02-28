import { H3Event } from "h3";
import { UserSession } from "../models/user_session";

export async function requireAdminRole(event: H3Event) {
  const user = await requireUserSession(event);

  if (user.role !== "ADMIN") {
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden",
      message: "Вам не разрешено выполнить это действие.",
    });
  }

  return user;
}
