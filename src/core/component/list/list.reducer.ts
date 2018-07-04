import * as R from 'ramda';
import { IEffectsAction } from 'redux-effects-promise';

import {
  FIRST_PAGE,
  ISelectedEntityWrapper,
  IRemovedEntityWrapper,
  IEntity,
  IPayloadWrapper,
} from '../../definitions.interface';
import { toSection } from '../../util';
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
      const sortDirectionEntityWrapper: IPayloadWrapper<ISortDirectionEntity> = action.data;
      return {
        ...state,
        directions: {
          ...state.directions,
          [sortDirectionEntityWrapper.payload.name]: sortDirectionEntityWrapper.payload.direction,
        },
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
    case ListActionBuilder.buildDestroyActionType(section):
      return {
        ...INITIAL_APPLICATION_LIST_STATE,
      };
    case ListActionBuilder.buildLoadDoneActionType(section):
      const listEntity: IListEntity = action.data;
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
            : listEntity
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
      const entityToSelectPayload: ISelectedEntityWrapper = action.data;
      return {
        ...state,
        selected: entityToSelectPayload.selected,
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
    case ListActionBuilder.buildUpdateActionType(section):
      if (state.data && state.data.length) {
        const mergeStrategy = (R.isNil(modifyDataPayload.mergeStrategy)
              || modifyDataPayload.mergeStrategy === EntityOnSaveMergeStrategyEnum.MERGE)
            ? EntityOnSaveMergeStrategyEnum.MERGE
            : EntityOnSaveMergeStrategyEnum.OVERRIDE;

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
      }
      break;
    case ListActionBuilder.buildInsertActionType(section):
      const insertedItem = { ...modifyDataPayload.changes };
      updatedData = (state.data || []).concat(insertedItem);

      return {
        ...state,
        data: updatedData,
        totalCount: ++state.totalCount,
        selected: insertedItem,
      };
    case ListActionBuilder.buildRemoveActionType(section):
      const entityToRemovePayload: IRemovedEntityWrapper = action.data;
      const filterFn = (entity) => !(entity === entityToRemovePayload || entity.id === entityToRemovePayload.removed.id);
      const isSelectedExist = !R.isNil(state.selected);
      const filteredData = state.data.filter(filterFn);

      return {
        ...state,
        selected: isSelectedExist && filterFn(state.selected) && state.selected
          || (isSelectedExist && filteredData.length > 0 ? filteredData[0] : null),
        data: filteredData,
        totalCount: --state.totalCount,
      };
    default:
      return state;
  }
}
