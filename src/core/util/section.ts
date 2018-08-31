import { IEffectsAction } from 'redux-effects-promise';

import { ISectionWrapper, IKeyValue, ACTION_PREFIX } from '../definitions.interface';

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

/**
 * @stable [31.08.2018]
 * @param {string} section
 * @returns {string}
 */
export const toActionPrefix = (section: string) => `${ACTION_PREFIX}${section}`;

export function toSection(action: IEffectsAction): string {
  return (action.data && action.data.section) || (action.initialData && action.initialData.section);
}
