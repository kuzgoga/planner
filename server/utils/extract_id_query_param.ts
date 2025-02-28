import { H3Event } from "h3";

export function getIdFromEvent(event: H3Event): number {
  const { id } = event.context.params || {};
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id не найден",
    });
  }

  const idInt = parseInt(id, 10);
  if (isNaN(idInt)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id должен быть числом",
    });
  }

  return idInt;
}
