import { LoginRequestSchema, LoginResponse } from "../models/models";
import { compareSync } from "bcrypt-ts";

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (body) =>
    LoginRequestSchema.safeParse(body),
  );

  if (!result.success) throw result.error.issues;

  const loginAttempt = result.data;
  const user = await User.findOneBy({ email: loginAttempt.email });

  if (!user) {
    throw createError({
      statusCode: 403,
      statusMessage: "Invalid credentials",
    });
  }

  if (!compareSync(loginAttempt.password, user.password_hash)) {
    throw createError({
      statusCode: 403,
      statusMessage: "Invalid credentials",
    });
  }

  const name = `${user.firstName} ${user.lastName}`;

  await setUserSession(event, {
    user: {
      name: name,
      role: user.role,
    },
  });

  const response: LoginResponse = {};
  return response;
});
