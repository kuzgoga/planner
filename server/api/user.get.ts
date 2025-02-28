import { ILike } from "typeorm";
import { User } from "../entities/user.entity";
import { GetAllUsersResponse } from "../models/get_all_users";

export default defineEventHandler(async (event) => {
  /* Get all users with search by email */
  const keyphrase = getRouterParam(event, "keyphrase");
  const _ = await requireUserSession(event);

  let users;
  if (!keyphrase) {
    users = await User.find({
      where: [
        { email: ILike(keyphrase!!) },
        { firstName: ILike(keyphrase!!) },
        { lastName: ILike(keyphrase!!) },
      ],
    });
  } else {
    users = await User.find();
  }

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
