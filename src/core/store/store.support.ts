import { Reducer, ReducersMapObject, combineReducers } from 'redux';
import { IEffectsAction } from 'redux-effects-promise';

import { toSection } from '../util';

export type FilterT = (action: IEffectsAction) => boolean;

/**
 * @stable - 10.04.2018
 * @param {string} customSection
 * @returns {FilterT}
 */
export function reducerSectionFilter(customSection: string): FilterT {
  let section;
  return (action) => (!(section = toSection(action)) || customSection === section);
}

/**
 * @stable - 10.04.2018
 * @param {Reducer<S>} reducer
 * @param {FilterT} filterObject
 * @returns {Reducer<S>}
 */
export const filter = <S>(reducer: Reducer<S>, filterObject: FilterT): Reducer<S> =>
  (state, action) => (filterObject(action) ? reducer(state, action) : state);

/**
 * @stable - 10.04.2018
 * @param {Reducer<S>} reducer
 * @param {string} customSection
 * @returns {Reducer<S>}
 */
export const filterBySection = <S>(reducer: Reducer<S>, customSection: string): Reducer<S> =>
  filter<S>(reducer, reducerSectionFilter(customSection));

/**
 * @stable - 15.04.2018
 * @param {TReducersMap} reducersMap
 * @returns {Reducer<ReducersMapObject>}
 */
export const composeReducers = <TReducersMap extends {}>(reducersMap: TReducersMap): Reducer<ReducersMapObject> =>
  combineReducers<ReducersMapObject>(reducersMap as ReducersMapObject);
