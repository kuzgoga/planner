import { PingResponse } from "../models/ping";
import { createTypedRoute } from "../utils/typed_route";

async function PingHandler(): Promise<PingResponse> {
  return { message: "pong" };
}

export default createTypedRoute(PingHandler);
