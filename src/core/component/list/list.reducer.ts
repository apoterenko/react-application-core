import * as R from 'ramda';
import { IEffectsAction } from 'redux-effects-promise';

import { FIRST_PAGE, ISelectedEntityWrapper } from '../../definitions.interface';
import { toSection } from '../../util';
import { convertError } from '../../error';
import { ListActionBuilder } from './list-action.builder';
import { INITIAL_APPLICATION_LIST_STATE } from './list-reducer.interface';
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
  const payload = modifyData && modifyData.payload;

  switch (action.type) {
    case ListActionBuilder.buildChangeSortDirectionActionType(section):
      const sortDirectionEntity: ISortDirectionEntity = action.data;
      return {
        ...state,
        directions: {
          ...state.directions,
          [sortDirectionEntity.name]: sortDirectionEntity.direction,
        },
      };
    case ListActionBuilder.buildChangeActionType(section):
      const fieldChangeEntity: IFieldChangeEntity = action.data;
      return {
        ...state,
        changes: {
          ...state.changes,
          [fieldChangeEntity.name]: fieldChangeEntity.value,
        },
      };
    case ListActionBuilder.buildFirstPageActionType(section):
      return {
        ...state,
        page: FIRST_PAGE,
      };
    case ListActionBuilder.buildLastPageActionType(section):
      return {
        ...state,
        page: Math.ceil(state.totalCount / state.pageSize),
      };
    case ListActionBuilder.buildPreviousPageActionType(section):
      return {
        ...state,
        page: --state.page,
      };
    case ListActionBuilder.buildNextPageActionType(section):
      return {
        ...state,
        page: ++state.page,
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
      };
    case ListActionBuilder.buildDestroyActionType(section):
      return {
        ...INITIAL_APPLICATION_LIST_STATE,
      };
    case ListActionBuilder.buildLoadDoneActionType(section):
      const listEntity: IListEntity = action.data;
      return Array.isArray(listEntity)
          ? {
            ...state,
            progress: false,
            data: listEntity,
          }
          : {
            ...state,
            progress: false,
            pageSize: listEntity.data.length,
            ...listEntity,
          };
    case ListActionBuilder.buildLoadErrorActionType(section):
      return {
        ...state,
        progress: false,
        error: convertError(action.error).message,
      };
    case ListActionBuilder.buildSelectActionType(section):
      const selectedEntityPayload: ISelectedEntityWrapper = action.data;
      return {
        ...state,
        selected: selectedEntityPayload.selected,
      };
    case ListActionBuilder.buildCreateActionType(section):
    case ListActionBuilder.buildDeselectActionType(section):
      return {
        ...state,
        selected: null,
      };
    case ListActionBuilder.buildUpdateActionType(section):
      if (state.data && state.data.length) {
        const mergeStrategy = (R.isNil(payload.mergeStrategy)
              || payload.mergeStrategy === EntityOnSaveMergeStrategyEnum.MERGE)
            ? EntityOnSaveMergeStrategyEnum.MERGE
            : EntityOnSaveMergeStrategyEnum.OVERRIDE;

        const updatedData = state.data.map((item) => (
            item.id === payload.id
                ? (
                    mergeStrategy === EntityOnSaveMergeStrategyEnum.OVERRIDE
                      ? { ...payload.changes }
                      : {...item, ...payload.changes}
                    )
                : item
        ));
        return {
          ...state,
          selected: state.selected
              ? updatedData.find((item) => item.id === state.selected.id) || state.selected
              : state.selected,
          data: updatedData,
        };
      }
      break;
    case ListActionBuilder.buildInsertActionType(section):
      return {
        ...state,
        data: (state.data || []).concat({ ...payload.changes }),
      };
    default:
      return state;
  }
}
