import * as R from 'ramda';
import { IEffectsAction } from 'redux-effects-promise';

import {
  IEntityIdTWrapper,
} from '../../definitions.interface';
import {
  ArrayUtils,
  asErrorMessage,
  buildEntityByMergeStrategy,
  ConditionUtils,
  ifNotNilThanValue,
  isMulti,
  mapIdentifiedEntity,
  mapSortDirectionEntity,
  notNilValuesFilter,
  nvl,
  NvlUtils,
  SAME_ENTITY_PREDICATE,
  selectData,
  Selectors,
  selectSelectedEntityFromAction,
} from '../../util';
import { ListActionBuilder } from './list-action.builder';
import {
  EntityMergeStrategiesEnum,
  FIRST_PAGE,
  IModifyEntityPayloadEntity,
  INITIAL_REDUX_LIST_ENTITY,
  IReduxListEntity,
  IReduxSortDirectionsEntity,
  ISortDirectionPayloadEntity,
} from '../../definition';

export const listReducer = (state: IReduxListEntity = INITIAL_REDUX_LIST_ENTITY,
                            action: IEffectsAction): IReduxListEntity => {
  const section = Selectors.sectionFromAction(action);
  let modifyDataPayload;

  switch (action.type) {
    /**
     * @stable [13.11.2019]
     */
    case ListActionBuilder.buildSortingDirectionChangeActionType(section):
      const sdPayloadWrapper: ISortDirectionPayloadEntity = action.data;
      const sdPayload = sdPayloadWrapper.payload;
      return {
        ...state,
        directions: notNilValuesFilter<IReduxSortDirectionsEntity, IReduxSortDirectionsEntity>({
          ...isMulti(sdPayload) ? state.directions : {},
          [sdPayload.name]: ifNotNilThanValue(sdPayload.direction, () => mapSortDirectionEntity(sdPayload)),
        }),
      };
    case ListActionBuilder.buildFirstPageActionType(section):
      return {
        ...state,
        lockPage: true,
        page: FIRST_PAGE,
      };
    case ListActionBuilder.buildLastPageActionType(section):
      return {
        ...state,
        lockPage: true,
        page: Math.ceil(state.totalCount / state.pageSize),
      };
    case ListActionBuilder.buildPreviousPageActionType(section):
      return {
        ...state,
        lockPage: true,
        page: --state.page,
      };
    case ListActionBuilder.buildNextPageActionType(section):
      return {
        ...state,
        lockPage: true,
        page: ++state.page,
      };
    case ListActionBuilder.buildLazyLoadActionType(section):
      return {
        ...state,
        progress: true,
      };
    case ListActionBuilder.buildUnTouchActionType(section):
      return {
        ...state,
        touched: false,
      };
    case ListActionBuilder.buildLoadActionType(section):
      return {
        ...INITIAL_REDUX_LIST_ENTITY,
        progress: true,
        touched: true,
        lockPage: state.lockPage,
        directions: state.directions,
      };
    case ListActionBuilder.buildCancelLoadActionType(section):
      /**
       * @stable [31.08.2018]
       */
      return {
        ...state,
        progress: false,
        touched: !R.isNil(state.data),  // We should allow load a data after cancel. This is actual for already created containers
      };
    case ListActionBuilder.buildResetActionType(section):
    case ListActionBuilder.buildDestroyActionType(section):
      return {
        ...INITIAL_REDUX_LIST_ENTITY,
      };
    case ListActionBuilder.buildLoadDoneActionType(section):
      const listEntity: IReduxListEntity = action.data;
      if (R.isNil(listEntity)) {
        // A request auto-cancelling
        return state;
      }
      const resultState = {
        ...state,
        progress: false,
        lockPage: false,
        ...(
          Array.isArray(listEntity)
            ? {
              data: listEntity,
              totalCount: listEntity.length,
              pageSize: null,
            }
            : {
              ...listEntity,
              totalCount: nvl(
                listEntity.totalCount,
                Array.isArray(listEntity.data) ? listEntity.data.length : 0
              ),
            }
        ),
        page: state.lockPage ? listEntity.page : INITIAL_REDUX_LIST_ENTITY.page,
      };
      // In the case of a silent reload
      const oldSelectedEntity = resultState.selected;
      if (!R.isNil(oldSelectedEntity)) {
        return {
          ...resultState,
          selected: R.find((entity) => SAME_ENTITY_PREDICATE(entity, oldSelectedEntity), resultState.data)
            || resultState.selected,
        };
      }
      return resultState;
    case ListActionBuilder.buildLazyLoadErrorActionType(section):
    case ListActionBuilder.buildLoadErrorActionType(section):
      return {
        ...INITIAL_REDUX_LIST_ENTITY,
        error: asErrorMessage(action.error).message,
      };

    /**
     * @stable [19.01.2020]
     */
    case ListActionBuilder.buildSelectActionType(section):
      return {
        ...state,
        selected: selectSelectedEntityFromAction(action),
      };

    case ListActionBuilder.buildCreateActionType(section):
    case ListActionBuilder.buildDeselectActionType(section):
      return {
        ...state,
        selected: null,
      };
    /**
     * @stable [19.10.2019]
     */
    case ListActionBuilder.buildLazyLoadDoneActionType(section):
      const lazyLoadedEntity = selectSelectedEntityFromAction(action) || selectData(action);
      modifyDataPayload = {
        id: lazyLoadedEntity.id,
        changes: lazyLoadedEntity,
        mergeStrategy: EntityMergeStrategiesEnum.OVERRIDE,
      };
    /**
     * @stable [19.10.2019]
     */
    case ListActionBuilder.buildMergeActionType(section):
    /**
     * @stable [20.10.2019]
     */
    case ListActionBuilder.buildUpdateActionType(section):
    /**
     * @stable [19.10.2019]
     */
    case ListActionBuilder.buildInsertActionType(section):
      modifyDataPayload = nvl(modifyDataPayload, Selectors.payloadFromAction<IModifyEntityPayloadEntity>(action));
      const doesEntityExist = ArrayUtils.doesArrayContainExistedEntity(state.data, modifyDataPayload);
      const mergedData = ArrayUtils.mergeArrayItem<IEntityIdTWrapper>(
        state.data,
        mapIdentifiedEntity(modifyDataPayload),
        SAME_ENTITY_PREDICATE,
        (itm) => buildEntityByMergeStrategy(modifyDataPayload, itm)
      );

      return {
        ...state,
        progress: false, // In a lazy-loading case
        data: mergedData,
        totalCount: (state.totalCount || 0) + (doesEntityExist ? 0 : 1),
        selected: doesEntityExist
          ? ifNotNilThanValue(
            state.selected,
            (selectedEntity) => nvl(mergedData.find((itm) => SAME_ENTITY_PREDICATE(itm, selectedEntity)), null)
          )
          // An inserted entity is selected by default
          : mergedData.find((itm) => SAME_ENTITY_PREDICATE(itm, modifyDataPayload)),
      };
    case ListActionBuilder.buildRemoveActionType(section):
      /**
       * @stable [08.06.2019]
       */
      const removedEntity = Selectors.payloadFromAction(action);
      const filteredData = state.data.filter((entity) => !SAME_ENTITY_PREDICATE(entity, removedEntity));
      return {
        ...state,
        selected: ConditionUtils.ifNotNilThanValue(
          state.selected,
          (selectedEntity) => NvlUtils.nvl(filteredData.find((itm) => SAME_ENTITY_PREDICATE(itm, selectedEntity)), null)
        ),
        data: filteredData,
        totalCount: filteredData.length === state.data.length ? state.totalCount : --state.totalCount,
      };
    default:
      return state;
  }
};
