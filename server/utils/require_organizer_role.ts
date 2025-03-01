import { H3Event } from "h3";

export async function requireOrganizerRole(event: H3Event) {
  let user;
  try {
    user = await requireUserSession(event);
  } catch (_) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "Пожалуйста, войдите в систему.",
    });
  }
  if (user.role !== "ORGANIZER") {
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden",
      message: "Вам не разрешено выполнить это действие.",
    });
  }
}
