import { H3Event, createError } from "h3";
import { CastFunction } from "./cast";

function getRequiredQueryParam<T>(
  event: H3Event,
  paramName: string,
  castFn: CastFunction<T>,
): T {
  const queryParams = getQuery(event);
  const paramValue = queryParams[paramName];

  if (!paramValue) {
    throw createError({
      statusCode: 400,
      statusMessage: `Query parameter "${paramName}" is required`,
    });
  }

  try {
    return castFn(paramValue as string);
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: `Query parameter "${paramName}" is invalid: ${error}`,
    });
  }
}

function getOptionalQueryParam<T>(
  event: H3Event,
  paramName: string,
  castFn: CastFunction<T>,
  defaultValue?: T,
): T | undefined {
  const queryParams = getQuery(event);
  const paramValue = queryParams[paramName];

  if (!paramValue) {
    return defaultValue;
  }

  try {
    return castFn(paramValue as string);
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: `Query parameter "${paramName}" is invalid: ${error}`,
    });
  }
}

export { getRequiredQueryParam, getOptionalQueryParam };
