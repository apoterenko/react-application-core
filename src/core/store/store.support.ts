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
  CloneUtils,
  coalesce,
  coalesceDef,
  toSection,
  TypeUtils,
} from '../util';
import {
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
        const defEntity = coalesceDef(payloadWrapper.payload, selectedWrapper.selected, replacedWrapper.replaced);

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

/**
 * @stable [06.04.2020]
 * @param {IEntityReducerFactoryConfigEntity} config
 * @returns {(state: {}, action: AnyAction) => {}}
 */
export const makeEntityReducer = (config: IEntityReducerFactoryConfigEntity): (state: {}, action: AnyAction) => {} =>
  (state = config.initialState || null, action): {} => {
    switch (action.type) {
      case config.update:
      case config.replace:
      case config.select:
        const selectedWrapper: ISelectedWrapper<{}> = action.data;
        const updatedWrapper: IUpdatedWrapper<{}> = action.data;
        const replacedWrapper: IReplacedWrapper = action.data;
        const selectedEntity = selectedWrapper.selected;
        const updatedEntity = updatedWrapper.updated;
        const replacedEntity = replacedWrapper.replaced;
        const entity = coalesce(selectedEntity, updatedEntity, replacedEntity);

        // When selected === null or replaced === null or updated === null
        const defEntity = coalesceDef(selectedEntity, updatedEntity, replacedEntity);

        return R.isNil(entity)
          ? (TypeUtils.isUndef(defEntity) ? state : defEntity)
          : (
            TypeUtils.isPrimitive(entity)
              ? entity
              : (
                Array.isArray(entity)
                  ? [...entity]
                  : (
                    R.isNil(replacedEntity)
                      ? {...state, ...entity}             // Select or update
                      : CloneUtils.shallowClone(entity)   // Replace
                  )
              )
          );
      case config.destroy:
        return null;
    }
    return state;
  };

/**
 * @stable [06.04.2020]
 * @param {IEntityReducerFactoryConfigEntity} config
 * @returns {IEntityActionBuilder<TValue>}
 */
export const makeEntityActionBuilderFactory =
  <TValue = {}>(config: IEntityReducerFactoryConfigEntity): IEntityActionBuilder<TValue> =>
    Reflect.construct(class implements IEntityActionBuilder {

      /**
       * @stable [06.04.2020]
       * @param {TPayload} replaced
       * @returns {IEffectsAction}
       */
      public buildReplaceAction<TPayload = TValue>(replaced: TPayload): IEffectsAction {
        const payloadWrapper: IReplacedWrapper<TPayload> = {replaced};
        return EffectsAction.create(config.replace, payloadWrapper);
      }

      /**
       * @stable [06.04.2020]
       * @returns {IEffectsAction}
       */
      public buildDestroyAction(): IEffectsAction {
        return EffectsAction.create(config.destroy);
      }

      /**
       * @stable [06.04.2020]
       * @param {TPayload} updated
       * @returns {IEffectsAction}
       */
      public buildUpdateAction<TPayload = TValue>(updated: TPayload): IEffectsAction {
        const payloadWrapper: IUpdatedWrapper<TPayload> = {updated};
        return EffectsAction.create(config.update, payloadWrapper);
      }

      /**
       * @stable [06.04.2020]
       * @param {TPayload} selected
       * @returns {IEffectsAction}
       */
      public buildSelectAction<TPayload = TValue>(selected: TPayload): IEffectsAction {
        const plainAction = this.buildSelectPlainAction(selected);
        return EffectsAction.create(plainAction.type, plainAction.data);
      }

      /**
       * @stable [06.04.2020]
       * @param {TValue} selected
       * @returns {IEffectsAction}
       */
      public buildSelectPlainAction<TPayload = TValue>(selected: TPayload): IEffectsAction {
        const payloadWrapper: ISelectedWrapper<TPayload> = {selected};
        return {type: config.select, data: payloadWrapper};
      }
    }, []);
