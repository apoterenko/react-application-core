import { AnyT } from 'core/definition.interface';

export function isUndef(value: AnyT): boolean {
  return typeof value === 'undefined';
}
