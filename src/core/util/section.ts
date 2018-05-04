import { IEffectsAction } from 'redux-effects-promise';

import { AnyT } from '../definitions.interface';

export function applySection(section: string, data?: AnyT): AnyT {
  return {
    section,
    ...data,
  };
}

export function toSection(action: IEffectsAction): string {
  return (action.data && action.data.section) || (action.initialData && action.initialData.section);
}
