export function isNullOrUndefined<T>(value: T): boolean {
  return value === undefined || value === null
}

export function isDefined<T>(value: T): boolean {
  return !isNullOrUndefined(value)
}

export function getOrDefault<T>(optional: T | null, _default: T): T {
  return isNullOrUndefined(optional) ? _default : optional;
}
