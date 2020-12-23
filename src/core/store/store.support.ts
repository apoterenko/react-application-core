import {
  AnyAction,
  combineReducers,
  Reducer,
  ReducersMapObject,
} from 'redux';
import {
  IEffectsAction,
} from 'redux-effects-promise';
import * as R from 'ramda';

import {
  CloneUtils,
  coalesce,
  NvlUtils,
  Selectors,
  TypeUtils,
} from '../util';
import {
  IPayloadWrapper,
  IReplacedWrapper,
  ISelectedWrapper,
} from '../definitions.interface';

export type FilterT = (action: IEffectsAction) => boolean;

/**
 * @stable - 10.04.2018
 * @param {string} customSection
 * @returns {FilterT}
 */
export function reducerSectionFilter(customSection: string): FilterT {
  let section;
  return (action) => (!(section = Selectors.sectionFromAction(action)) || customSection === section);
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
 * @deprecated Use makeEntityReducer
 * @param {string} updateActionType
 * @param {string} destroyActionType
 * @param {TPayload} initialState
 * @returns {(state: TPayload, action: AnyAction) => TPayload}
 */
export const entityReducerFactory = (
  updateActionType: string,
  destroyActionType: string,
  initialState = null): (state: {}, action: AnyAction) => {} =>
  (state = initialState,
   action: AnyAction): {} => {
    switch (action.type) {
      case updateActionType:
        const payloadWrapper: IPayloadWrapper = action.data;
        const selectedWrapper: ISelectedWrapper<{}> = action.data;
        const replacedWrapper: IReplacedWrapper = action.data;
        const entity = coalesce(payloadWrapper.payload, selectedWrapper.selected, replacedWrapper.replaced);

        // selected === null or payload === null
        const defEntity = NvlUtils.coalesceDef(payloadWrapper.payload, selectedWrapper.selected, replacedWrapper.replaced);

        return R.isNil(entity)
          ? (TypeUtils.isUndef(defEntity) ? state : defEntity)
          : (
            TypeUtils.isPrimitive(entity)
              ? entity
              : (
                Array.isArray(entity)
                  ? [...entity]
                  : (
                    R.isNil(replacedWrapper.replaced)
                      ? {...state, ...entity}
                      : CloneUtils.shallowClone(entity)
                  )
              )
          );
      case destroyActionType:
        return null;
    }
    return state;
  };
