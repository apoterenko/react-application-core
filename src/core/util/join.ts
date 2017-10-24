import { AnyT } from '../definition.interface';

export function join(parts: AnyT[], joiner: string = '\u0020'): string {
  return parts.filter((v) => !!v).join(joiner);
}
