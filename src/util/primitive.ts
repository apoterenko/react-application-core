import { AnyT } from 'core/definition.interface';

export const isPrimitive = (v: AnyT): boolean => {
  return typeof v === 'number'
      || typeof v === 'string'
      || typeof v === 'boolean';
};
