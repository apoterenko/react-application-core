import { AnyT } from '../definitions.interface';

export function isDef(value: AnyT): boolean {
  return !isUndef(value);
}

export function isUndef(value: AnyT): boolean {
  return typeof value === 'undefined';
}

export function isNull(value: AnyT): boolean {
  return value === null;
}

export function isFn(value: AnyT): boolean {
  return typeof value === 'function';
}

export function isNumber(value: AnyT): boolean {
  return typeof value === 'number';
}

export function isBoolean(value: AnyT): boolean {
  return typeof value === 'boolean';
}

export function isString(value: AnyT): boolean {
  return typeof value === 'string';
}

export const isPrimitive = (v: AnyT): boolean => {
  return isNumber(v)
      || isString(v)
      || isBoolean(v);
};

export const isObject = (v: AnyT): boolean => {
  return Object.prototype.toString.call(v) === '[object Object]';
};
