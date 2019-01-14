import { Reducer, ReducersMapObject, combineReducers, AnyAction } from 'redux';
import { IEffectsAction } from 'redux-effects-promise';
import * as R from 'ramda';

import { toSection, isPrimitive } from '../util';
import { IEntity, IKeyValue, IPayloadWrapper, ISelectedWrapper } from '../definitions.interface';

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
 * @stable [11.08.2018]
 * @param {string} updateActionType
 * @param {string} destroyActionType
 * @param {TKeyValue} initialState
 * @returns {(state: TKeyValue, action: AnyAction) => TKeyValue}
 */
export const entityReducerFactory = <TKeyValue extends IKeyValue>(
      updateActionType: string,
      destroyActionType: string,
      initialState: TKeyValue = null): (state: TKeyValue, action: AnyAction) => TKeyValue =>
  (state = initialState,
   action: AnyAction): TKeyValue => {
    switch (action.type) {
      case updateActionType:
        const payloadWrapper: IPayloadWrapper<TKeyValue> = action.data;
        const selectedWrapper: ISelectedWrapper<TKeyValue> = action.data;
        const entity = payloadWrapper.payload || selectedWrapper.selected;

        return R.isNil(entity)
          ? state
          : isPrimitive(entity) ? entity : {
            ...state as {},
            ...entity as {},
          } as TKeyValue;
      case destroyActionType:
        return null;
    }
    return state;
  };
