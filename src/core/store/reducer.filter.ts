import { Reducer } from 'redux';
import { IEffectsAction } from 'redux-effects-promise';

import { toSection } from '../util';

export type Filter = (action: IEffectsAction) => boolean;

/**
 * @stable - 10.04.2018
 * @param {string} customSection
 * @returns {Filter}
 */
export function reducerSectionFilter(customSection: string): Filter {
  let section;
  return (action) => (!(section = toSection(action)) || customSection === section);
}

/**
 * @stable - 10.04.2018
 * @param {Reducer<S>} reducer
 * @param {Filter} filterObject
 * @returns {Reducer<S>}
 */
export const filter = <S>(reducer: Reducer<S>, filterObject: Filter): Reducer<S> =>
  (state, action) => (filterObject(action) ? reducer(state, action) : state);

/**
 * @stable - 10.04.2018
 * @param {Reducer<S>} reducer
 * @param {string} customSection
 * @returns {Reducer<S>}
 */
export const filterBySection = <S>(reducer: Reducer<S>, customSection: string): Reducer<S> =>
  filter<S>(reducer, reducerSectionFilter(customSection));
