import { User } from "../entities/user.entity";
import { GetAllUsersResponse } from "../models/get_all_users";

export default defineEventHandler(async (event) => {
  const users = await User.find();
  const response: GetAllUsersResponse = {
    users: users.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    })),
  };
  return response;
});
