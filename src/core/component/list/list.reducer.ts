import * as R from 'ramda';
import { IEffectsAction } from 'redux-effects-promise';

import { FIRST_PAGE, IEntity, IListEntity } from '../../definition.interface';
import { toSection } from '../../store';
import { convertError } from '../../error';
import { ListActionBuilder } from './list-action.builder';
import { INITIAL_APPLICATION_LIST_STATE, IApplicationListState } from './list.interface';
import {
  EntityOnSaveMergeStrategyEnum,
  IModifyEntityPayloadWrapper,
} from '../../api';

export function listReducer(state: IApplicationListState = INITIAL_APPLICATION_LIST_STATE,
                            action: IEffectsAction): IApplicationListState {
  const section = toSection(action);
  const modifyData: IModifyEntityPayloadWrapper = action.data;
  const payload = modifyData && modifyData.payload;

  switch (action.type) {
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
      const result = action.data;
      return Array.isArray(result)
          ? {
            ...state,
            progress: false,
            data: result,
          }
          : {
            ...state,
            progress: false,
            pageSize: (result as IListEntity<IEntity>).data.length,
            ...result,
          };
    case ListActionBuilder.buildLoadErrorActionType(section):
      return {
        ...state,
        progress: false,
        error: convertError(action.error).message,
      };
    case ListActionBuilder.buildSelectActionType(section):
      return {
        ...state,
        selected: action.data.selected,
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
