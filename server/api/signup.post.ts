import { SignUpRequestSchema } from "../models/models";
import { User } from "../entities/user.entity";
import "dotenv/config";
import { genSaltSync, hashSync } from "bcrypt-ts";

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (body) =>
    SignUpRequestSchema.safeParse(body),
  );

  if (!result.success) throw result.error.issues;

  const salt = genSaltSync(Number(process.env.SALT_ROUNDS));
  const password_hash = hashSync(result.data.password, salt);

  const newUser = User.create({
    firstName: result.data.firstName,
    lastName: result.data.lastName,
    email: result.data.email,
    password_hash: password_hash,
  });
  await newUser.save();

  await setUserSession(event, {
    user: {
      name: `${result.data.firstName} ${result.data.lastName}`,
      role: newUser.role,
    },
  });

  const response = { id: newUser.id };
  return response;
});
