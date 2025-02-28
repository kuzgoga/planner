import { PingResponse } from "../models/models";

export default defineEventHandler(async (event) => {
  const response: PingResponse = { message: "pong" };
  return response;
});
