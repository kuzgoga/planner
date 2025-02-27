import { User } from "../entities/user.entity";

export default defineEventHandler(async (event) => {
  const users = await User.find();
  return users;
});
