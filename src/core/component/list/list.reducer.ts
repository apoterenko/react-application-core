import * as R from 'ramda';
import { IEffectsAction } from 'redux-effects-promise';

import {
  FIRST_PAGE,
  ISelectedEntityWrapper,
  IRemovedEntityWrapper,
  IEntity,
  IPayloadWrapper,
} from '../../definitions.interface';
import { notNilValuesFilter, toSection, toType, SAME_ENTITY_PREDICATE, nvl, ifNotNilThanValue } from '../../util';
import { convertError } from '../../error';
import { ListActionBuilder } from './list-action.builder';
import { INITIAL_APPLICATION_LIST_STATE } from './list.interface';
import {
  EntityOnSaveMergeStrategyEnum,
  IModifyEntityPayloadWrapper,
} from '../../api';
import {
  IListEntity,
  ISortDirectionEntity,
  IFieldChangeEntity,
} from '../../entities-definitions.interface';

export function listReducer(state: IListEntity = INITIAL_APPLICATION_LIST_STATE,
                            action: IEffectsAction): IListEntity {
  const section = toSection(action);
  const modifyData: IModifyEntityPayloadWrapper = action.data;

  let modifyDataPayload = modifyData && modifyData.payload;
  let updatedData;

  switch (action.type) {
    case ListActionBuilder.buildChangeSortDirectionActionType(section):
      const sortDirectionPayload = toType<IPayloadWrapper<ISortDirectionEntity>>(action.data).payload;
      return {
        ...state,
        directions: notNilValuesFilter({
          ...state.directions,
          [sortDirectionPayload.name]: sortDirectionPayload.direction,
        }),
      };
    case ListActionBuilder.buildChangeActionType(section):
      const fieldChangeEntity: IFieldChangeEntity = action.data;
      const fieldChangeEntityId = fieldChangeEntity.rawData.id;
      return {
        ...state,
        changes: {
          ...state.changes,
          [fieldChangeEntityId]: {
            ...(state.changes || {})[fieldChangeEntityId],
            [fieldChangeEntity.name]: fieldChangeEntity.value,
          },
        },
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
        ...INITIAL_APPLICATION_LIST_STATE,
        progress: true,
        touched: true,
        lockPage: state.lockPage,
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
        ...INITIAL_APPLICATION_LIST_STATE,
      };
    case ListActionBuilder.buildLoadDoneActionType(section):
      const listEntity: IListEntity = action.data;
      if (R.isNil(listEntity)) {
        // A request auto-cancelling
        return state;
      }
      return {
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
        page: state.lockPage ? listEntity.page : INITIAL_APPLICATION_LIST_STATE.page,
      };
    case ListActionBuilder.buildLazyLoadErrorActionType(section):
    case ListActionBuilder.buildLoadErrorActionType(section):
      return {
        ...INITIAL_APPLICATION_LIST_STATE,
        error: convertError(action.error).message,
      };
    case ListActionBuilder.buildSelectActionType(section):
      return {
        ...state,
        selected: toType<ISelectedEntityWrapper>(action.data).selected,
      };
    case ListActionBuilder.buildCreateActionType(section):
    case ListActionBuilder.buildDeselectActionType(section):
      return {
        ...state,
        selected: null,
      };
    case ListActionBuilder.buildLazyLoadDoneActionType(section):
      const lazyLoadedEntity: IEntity = action.data;
      modifyDataPayload = {
        id: lazyLoadedEntity.id,
        changes: lazyLoadedEntity,
      };
    // No breaks! Go to update the entity.
    case ListActionBuilder.buildMergeActionType(section):
    // No breaks! Go to update the entity.
    case ListActionBuilder.buildInsertActionType(section):
      if (R.isNil(modifyDataPayload.id) || R.isNil(R.find((item) => item.id === modifyDataPayload.id, state.data || []))) {
        const insertedItem = {...modifyDataPayload.changes};
        updatedData = (state.data || []).concat(insertedItem);

        return {
          ...state,
          data: updatedData,
          totalCount: ++state.totalCount,
          selected: insertedItem,
          progress: false,      // In a lazy-loading case
        };
      }
    // No breaks! Go to update the entity.
    case ListActionBuilder.buildUpdateActionType(section):
      const mergeStrategy = (R.isNil(modifyDataPayload.mergeStrategy)
        || modifyDataPayload.mergeStrategy === EntityOnSaveMergeStrategyEnum.MERGE)
        ? EntityOnSaveMergeStrategyEnum.MERGE
        : EntityOnSaveMergeStrategyEnum.OVERRIDE;
      if (state.data && state.data.length) {
        updatedData = state.data.map((item) => (
            item.id === modifyDataPayload.id
                ? (
                    mergeStrategy === EntityOnSaveMergeStrategyEnum.OVERRIDE
                      ? { ...modifyDataPayload.changes }
                      : {...item, ...modifyDataPayload.changes}
                    )
                : item
        ));
        return {
          ...state,
          selected: state.selected
              ? updatedData.find((item) => item.id === state.selected.id) || state.selected
              : state.selected,
          data: updatedData,
          progress: false,      // In a lazy-loading case
        };
      } else {
        return {
          ...state,
          selected: mergeStrategy === EntityOnSaveMergeStrategyEnum.OVERRIDE
            ? {...modifyDataPayload.changes}
            : {...state.selected, ...modifyDataPayload.changes},
          progress: false,      // In a lazy-loading case
        };
      }
    case ListActionBuilder.buildRemoveActionType(section):
      /**
       * @stable [08.06.2019]
       */
      const removedEntity = toType<IRemovedEntityWrapper>(action.data).removed;
      const filteredData = state.data.filter((entity) => !SAME_ENTITY_PREDICATE(entity, removedEntity));
      return {
        ...state,
        selected: ifNotNilThanValue(
          state.selected,
          (selectedEntity) => filteredData.find((itm) => SAME_ENTITY_PREDICATE(itm, selectedEntity))
        ),
        data: filteredData,
        totalCount: filteredData.length === state.data.length ? state.totalCount : --state.totalCount,
      };
    default:
      return state;
  }
}
