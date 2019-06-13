import { Reducer, ReducersMapObject, combineReducers, AnyAction } from 'redux';
import { IEffectsAction } from 'redux-effects-promise';
import * as R from 'ramda';

import { toSection, isPrimitive, isUndef, coalesce, shallowClone, coalesceDef } from '../util';
import { IPayloadWrapper, ISelectedWrapper, IReplacedWrapper, AnyT } from '../definitions.interface';

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
 * @param {TPayload} initialState
 * @returns {(state: TPayload, action: AnyAction) => TPayload}
 */
export const entityReducerFactory = (
      updateActionType: string,
      destroyActionType: string,
      initialState: AnyT = null): (state: AnyT, action: AnyAction) => AnyT =>
  (state = initialState,
   action: AnyAction): AnyT => {
    switch (action.type) {
      case updateActionType:
        const payloadWrapper: IPayloadWrapper<AnyT> = action.data;
        const selectedWrapper: ISelectedWrapper<AnyT> = action.data;
        const replacedWrapper: IReplacedWrapper<AnyT> = action.data;
        const entity = coalesce(payloadWrapper.payload, selectedWrapper.selected, replacedWrapper.replaced);

        // selected === null or payload === null
        const defEntity = coalesceDef(payloadWrapper.payload, selectedWrapper.selected, replacedWrapper.replaced);

        return R.isNil(entity)
          ? (isUndef(defEntity) ? state : defEntity)
          : (
            isPrimitive(entity)
              ? entity
              : (
                Array.isArray(entity)
                  ? [...entity]
                  : (
                    R.isNil(replacedWrapper.replaced)
                      ? {...state, ...entity}
                      : shallowClone(entity)
                  )
              )
          );
      case destroyActionType:
        return null;
    }
    return state;
  };
