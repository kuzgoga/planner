import { PingResponse } from "../models/ping";

export default defineEventHandler(async (event) => {
  const response: PingResponse = { message: "pong" };
  return response;
});
