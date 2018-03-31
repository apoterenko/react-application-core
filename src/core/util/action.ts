import { AnyT } from '../definitions.interface';

export function applySection(section: string, data?: AnyT): AnyT {
  return {
    section,
    ...data,
  };
}
