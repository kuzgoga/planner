import { userSchema } from "../models/user";

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (body) =>
    userSchema.safeParse(body),
  ); // or `.parse` to directly throw an error

  if (!result.success) throw result.error.issues;

  // User object is validated and typed!
  return result.data;
});
