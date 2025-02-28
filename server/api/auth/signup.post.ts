import { SignUpRequestSchema, SignUpResponse } from "../../models/signup";
import { User } from "../../entities/user.entity";
import "dotenv/config";
import { genSaltSync, hashSync } from "bcrypt-ts";

export default defineEventHandler(async (event) => {
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

  const response: SignUpResponse = { id: newUser.id };
  return response;
});
