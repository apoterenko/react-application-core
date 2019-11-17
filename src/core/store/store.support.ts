import {
  AnyAction,
  combineReducers,
  Reducer,
  ReducersMapObject,
} from 'redux';
import {
  EffectsAction,
  IEffectsAction,
} from 'redux-effects-promise';
import * as R from 'ramda';

import {
  coalesce,
  coalesceDef,
  isPrimitive,
  isUndef,
  shallowClone,
  toSection,
  toType,
} from '../util';
import {
  AnyT,
  IPayloadWrapper,
  IReplacedWrapper,
  ISelectedWrapper,
  IUpdatedWrapper,
} from '../definitions.interface';
import {
  IEntityActionBuilder,
  IEntityReducerFactoryConfigEntity,
} from '../definition';

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
 * @deprecated Use makeEntityReducerFactory
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

/**
 * @stable [26.08.2019]
 * @param {IEntityReducerFactoryConfigEntity} config
 * @returns {(state: AnyT, action: AnyAction) => AnyT}
 */
export const makeEntityReducerFactory = (config: IEntityReducerFactoryConfigEntity): (state: AnyT, action: AnyAction) => AnyT =>
  (state = config.initialState || null, action): AnyT => {
    switch (action.type) {
      case config.update:
      case config.replace:
      case config.select:
        const selectedWrapper: ISelectedWrapper<AnyT> = action.data;
        const updatedWrapper: IUpdatedWrapper<AnyT> = action.data;
        const replacedWrapper: IReplacedWrapper<AnyT> = action.data;
        const selectedEntity = selectedWrapper.selected;
        const updatedEntity = updatedWrapper.updated;
        const replacedEntity = replacedWrapper.replaced;
        const entity = coalesce(selectedEntity, updatedEntity, replacedEntity);

        // When selected === null or replaced === null or updated === null
        const defEntity = coalesceDef(selectedEntity, updatedEntity, replacedEntity);

        return R.isNil(entity)
          ? (isUndef(defEntity) ? state : defEntity)
          : (
            isPrimitive(entity)
              ? entity
              : (
                Array.isArray(entity)
                  ? [...entity]
                  : (
                    R.isNil(replacedEntity)
                      ? {...state, ...entity}  // Select or update
                      : shallowClone(entity)   // Replace
                  )
              )
          );
      case config.destroy:
        return null;
    }
    return state;
  };

/**
 * @stable [26.08.2019]
 * @param {IEntityReducerFactoryConfigEntity} config
 * @returns {IEntityActionBuilder}
 */
export const makeEntityActionBuilderFactory = (config: IEntityReducerFactoryConfigEntity): IEntityActionBuilder =>
  Reflect.construct(class implements IEntityActionBuilder {

    /**
     * @sable [26.08.2019]
     * @param {AnyT} replaced
     * @returns {IEffectsAction}
     */
    public buildReplaceAction<TValue = AnyT>(replaced: TValue): IEffectsAction {
      return EffectsAction.create(config.replace, toType<IReplacedWrapper<TValue>>({replaced}));
    }

    /**
     * @stable [08.11.2019]
     * @returns {IEffectsAction}
     */
    public buildDestroyAction(): IEffectsAction {
      return EffectsAction.create(config.destroy);
    }

    /**
     * @stable [04.09.2019]
     * @param {TValue} updated
     * @returns {IEffectsAction}
     */
    public buildUpdateAction<TValue = AnyT>(updated: TValue): IEffectsAction {
      return EffectsAction.create(config.update, toType<IUpdatedWrapper<TValue>>({updated}));
    }

    /**
     * @sable [26.08.2019]
     * @param {AnyT} selected
     * @returns {IEffectsAction}
     */
    public buildSelectAction<TValue = AnyT>(selected: TValue): IEffectsAction {
      return EffectsAction.create(config.select, toType<ISelectedWrapper<TValue>>({selected}));
    }
  }, []);
