import { z } from "zod";
import { Role } from "../entities/user.entity";

export const UserSchema = z.object({
  id: z.number().min(1),
  firstName: z.string().min(2).max(128),
  lastName: z.string().min(2).max(128),
  email: z.string().email().max(128),
  role: z.enum(["PARTICIPANT", "ADMIN", "ORGANIZER"]),
});
export type UserIn = z.infer<typeof UserSchema>;

export type GetAllUsersRequest = {};
export type GetAllUsersResponse = {
  users: UserIn[];
};

export type GetUserByIdResponse = UserIn;
