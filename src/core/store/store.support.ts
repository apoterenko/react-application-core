import { Reducer, ReducersMapObject, combineReducers, AnyAction } from 'redux';
import { IEffectsAction } from 'redux-effects-promise';
import * as R from 'ramda';

import { toSection } from '../util';
import { IEntity, IPayloadWrapper } from '../definitions.interface';

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

/**
 * @stable [31.07.2018]
 * @param {string} updateActionType
 * @param {string} destroyActionType
 * @returns {(state: IEntity, action: AnyAction) => IEntity}
 */
export const entityReducerFactory = (updateActionType: string, destroyActionType: string) =>
  (state: IEntity = null,
   action: AnyAction): IEntity => {
    switch (action.type) {
      case updateActionType:
        const payloadWrapper: IPayloadWrapper<IEntity> = action.data;
        return R.isNil(payloadWrapper.payload)
          ? state
          : {
            ...state,
            ...payloadWrapper.payload,
          };
      case destroyActionType:
        return null;
    }
    return state;
  };
