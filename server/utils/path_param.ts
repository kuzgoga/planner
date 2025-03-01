import { H3Event, createError } from "h3";
import { CastFunction } from "./cast";

function getRequiredPathParam<T>(
  event: H3Event,
  paramName: string,
  castFn: CastFunction<T>,
): T {
  const params = event.context.params || {};
  const paramValue = params[paramName];

  if (paramValue === undefined) {
    throw createError({
      statusCode: 400,
      statusMessage: `Path parameter "${paramName}" is required`,
    });
  }

  try {
    return castFn(paramValue as string);
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: `Path parameter "${paramName}" is invalid: ${error}`,
    });
  }
}

function getOptionalPathParam<T>(
  event: H3Event,
  paramName: string,
  castFn: CastFunction<T>,
  defaultValue?: T,
): T | undefined {
  const params = event.context.params || {};
  const paramValue = params[paramName];

  if (paramValue === undefined) {
    return defaultValue;
  }

  try {
    return castFn(paramValue as string);
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: `Path parameter "${paramName}" is invalid: ${error}`,
    });
  }
}

export { getRequiredPathParam, getOptionalPathParam };
