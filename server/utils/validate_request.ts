import { ZodSchema, ZodError } from "zod";
import { H3Event, createError } from "h3";

export async function validateRequest<T>(
  event: H3Event,
  schema: ZodSchema<T>,
): Promise<T> {
  const body = await readBody(event);
  const result = schema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation Error",
      data: result.error.issues,
    });
  }

  return result.data;
}
