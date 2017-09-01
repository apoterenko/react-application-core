import { AnyT } from 'core/definition.interface';

export const isUndef = function (value: AnyT) {
  return typeof value === 'undefined';
};
