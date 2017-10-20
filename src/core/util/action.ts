import { AnyT } from '../definition.interface';

export function applySection(section: string, data?: AnyT): AnyT {
  return {
    section,
    ...data,
  };
}
