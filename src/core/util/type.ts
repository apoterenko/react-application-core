import { AnyT } from '../definition.interface';

export function isUndef(value: AnyT): boolean {
  return typeof value === 'undefined';
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
