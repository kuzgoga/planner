import { defineEventHandler, H3Event } from "h3";

export type TypedHandler<T> = (event: H3Event) => Promise<T> | T;

export function createTypedRoute<T>(handler: TypedHandler<T>) {
  return defineEventHandler(handler);
}
