import { H3Event, createError } from "h3";

export type CastFunction<T> = (value: string) => T;

const castToNumber: CastFunction<number> = (value) => {
  const parsed = parseFloat(value);
  if (isNaN(parsed)) {
    throw new Error("Invalid number");
  }
  return parsed;
};

const castToBoolean: CastFunction<boolean> = (value) => {
  if (value.toLowerCase() === "true") return true;
  if (value.toLowerCase() === "false") return false;
  throw new Error("Invalid boolean");
};

const castToString: CastFunction<string> = (value) => value;

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

export {
  getRequiredPathParam,
  getOptionalPathParam,
  castToNumber,
  castToBoolean,
  castToString,
};
