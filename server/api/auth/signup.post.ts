import { SignUpRequestSchema, SignUpResponse } from "../../models/signup";
import { User } from "../../entities/user.entity";
import "dotenv/config";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { createTypedRoute } from "../../utils/typed_route";
import { H3Event, EventHandlerRequest } from "h3";
import { Role } from "~/server/models/role";
import { sendNotification } from "~/server/utils/notifications";

async function signup_handler(event: H3Event): Promise<SignUpResponse> {
  const signupAttempt = await validateRequest(event, SignUpRequestSchema);

  const salt = genSaltSync(Number(process.env.SALT_ROUNDS));
  const password_hash = hashSync(signupAttempt.password, salt);

  const newUser = User.create({
    firstName: signupAttempt.firstName,
    lastName: signupAttempt.lastName,
    email: signupAttempt.email,
    password_hash: password_hash,
    role: Role.PARTICIPANT,
  });
  await newUser.save();

  const name = `${signupAttempt.firstName} ${signupAttempt.lastName}`;
  await setUserSession(event, {
    user: {
      id: newUser.id,
      name: name,
      role: newUser.role,
    },
  });

  await sendNotification(
    newUser.email,
    "Платформа задач 'Планнер'",
    `Добро пожаловать, ${name}! Рады видеть вас на нашем платформе 'Планнер'!`,
  );

  return { id: newUser.id };
}

export default createTypedRoute(signup_handler);
