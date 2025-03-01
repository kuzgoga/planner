import { H3Event, EventHandlerRequest } from "h3";
import { ZodObject, ZodString, ZodTypeAny } from "zod";
import { LoginRequestSchema, LoginResponse } from "../../models/login";
import { compareSync } from "bcrypt-ts";
import { validateRequest } from "../../utils/validate_request";
import { createTypedRoute } from "../../utils/typed_route";
import { Role } from "~/server/models/role";


async function loginHandler(event: H3Event): Promise<LoginResponse> {
  const loginAttempt = await validateRequest(event, LoginRequestSchema);
  const user = await User.findOneBy({ email: loginAttempt.email });

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Неверные учетные данные",
    });
  }

  if (!compareSync(loginAttempt.password, user.password_hash)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Неверные учетные данные",
    });
  }

  const name = `${user.firstName} ${user.lastName}`;

  await setUserSession(event, {
    user: {
      id: user.id,
      name: name,
      role: user.role,
    },
  });

  return {};
}

export default createTypedRoute(loginHandler);
