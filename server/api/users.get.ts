import { ILike } from "typeorm";
import { User } from "../entities/user.entity";
import { GetAllUsersResponse } from "../models/get_all_users";

export default defineEventHandler(async (event) => {
  /* Get all users with search by email and name */
  /* Use query parameter `keyphrase` to search by email, first name, and last name */
  const _ = await requireUserSession(event);

  const query = getQuery(event);

  let users;
  if (!query.keyphrase) {
    users = await User.find({
      where: [
        { email: ILike(query.keyphrase!!.toString()) },
        { firstName: ILike(query.keyphrase!!.toString()) },
        { lastName: ILike(query.keyphrase!!.toString()) },
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
