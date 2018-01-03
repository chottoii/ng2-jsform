export function isArray(item: any): boolean {
  return Array.isArray(item) ||
    Object.prototype.toString.call(item) === '[object Array]';
};

export function isObject(item: any): boolean {
  return item !== null && typeof item === 'object' &&
    Object.prototype.toString.call(item) === '[object Object]';
};

export function isEmpty(value: any): boolean {
  if (isArray(value)) {
    return !value.length;
  }
  if (isObject(value)) {
    return !Object.keys(value).length;
  }
  return value === undefined || value === null || value === '';
};

export function isNumber(value: any, strict: any = false): boolean {
  if (strict && typeof value !== 'number') {
    return false;
  }
  return !isNaN(value) && value !== value / 0;
};

export function isString(value: any): boolean {
  return typeof value === 'string';
};

export function xor(value1: any, value2: any): boolean {
  return (!!value1 && !value2) || (!value1 && !!value2);
};

export function isInteger(value: any, strict: any = false): boolean {
  if (strict && typeof value !== 'number') { return false; }
  return !isNaN(value) &&  value !== value / 0 && value % 1 === 0;
}

export function isBoolean(value: any): boolean {
  return value === true || value === 1 || value === 'true' || value === '1' ||
    value === false || value === 0 || value === 'false' || value === '0';
}

export function hasValue(value: any): boolean {
  return value !== undefined && value !== null && value !== '';
}

export function isType(value: any, type: string): boolean {
  switch (type) {
    case 'string':
      return isString(value);
    case 'number':
      return isNumber(value);
    case 'integer':
      return isInteger(value);
    case 'boolean':
      return isBoolean(value);
    case 'null':
      return !hasValue(value);
    default:
      console.error(`isType error: "${type}" is not a recognized type.`);
      return null;
  }
}

export function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
