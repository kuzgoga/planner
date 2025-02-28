import { UserIn } from "./user";

export type GetAllUsersRequest = {};
export type GetAllUsersResponse = {
  users: UserIn[];
};
