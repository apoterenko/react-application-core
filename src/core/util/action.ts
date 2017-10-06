import { AnyT } from '../definition.interface';

export function applySection(section: string, data?: AnyT): void {
  return {
    section,
    ...data,
  };
}
