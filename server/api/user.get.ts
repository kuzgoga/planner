import { Equal } from "typeorm";
import { User } from "../entities/user.entity";
import { GetUserByIdResponse } from "../models/get_user_by_id";

export default defineEventHandler(async (event) => {
  /* Get user by id */
  const _ = await requireUserSession(event);

  const query = getQuery(event);

  if (!query.id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Query parameter 'id' is required",
    });
  }

  const userId = parseInt(query.id.toString(), 10);
  if (isNaN(userId)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Query parameter 'id' must be a valid number",
    });
  }

  const user = await User.findOne({
    where: { id: Equal(userId) },
  });

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: "Пользователь не найден",
    });
  }

  const response: GetUserByIdResponse = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  };

  return response;
});
