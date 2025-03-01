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

export { castToNumber, castToBoolean, castToString };
