import { IEffectsAction } from 'redux-effects-promise';

import { ISectionWrapper, IKeyValue } from '../definitions.interface';

/**
 * @stable [14.08.2018]
 * @param {string} section
 * @param {IKeyValue} data
 * @returns {TResult}
 */
export const applySection = <TResult extends ISectionWrapper = ISectionWrapper>(section: string, data?: IKeyValue): TResult => ({
  section,
  ...data,
}) as TResult;

export function toSection(action: IEffectsAction): string {
  return (action.data && action.data.section) || (action.initialData && action.initialData.section);
}
