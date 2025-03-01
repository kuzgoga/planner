import { ILike } from "typeorm";
import { User } from "../entities/user.entity";
import { GetAllUsersResponse } from "../models/user_routes";
import { H3Event, EventHandlerRequest } from "h3";
import { createTypedRoute } from "../utils/typed_route";
import { Role } from "../models/role";


async function getAllUsersHandler(
  event: H3Event,
): Promise<GetAllUsersResponse> {
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

  return {
    users: users.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    })),
  };
}

export default createTypedRoute(getAllUsersHandler);
