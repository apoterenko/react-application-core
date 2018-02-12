import { uuid } from './uuid';

export function uniqueName(name?: string): string {
  return [(name || '').toLowerCase().trim(), uuid()].join('_');
}
