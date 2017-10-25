import { IEffectsAction } from 'redux-effects-promise';

import { FIRST_PAGE, IEntity } from '../../definition.interface';
import { toSection } from '../../store';
import { convertError } from '../../error';
import { ListActionBuilder } from './list-action.builder';
import { INITIAL_APPLICATION_LIST_STATE, IApplicationListState, IListEntity } from './list.interface';

export function listReducer(state: IApplicationListState = INITIAL_APPLICATION_LIST_STATE,
                            action: IEffectsAction): IApplicationListState {
  const section = toSection(action);
  const payload = action.data && action.data.payload;

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
    case ListActionBuilder.buildLoadActionType(section):
      return {
        ...state,
        progress: true,
        dirty: true,
        selected: null,
        error: null,
      };
    case ListActionBuilder.buildLockActionType(section):
      return {
        ...state,
        locked: true,
      };
    case ListActionBuilder.buildDestroyActionType(section):
      return state.locked
          ? {
            ...state,
            locked: false,
          }
          : {
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
    case ListActionBuilder.buildAddItemActionType(section):
    case ListActionBuilder.buildDeselectActionType(section):
      return {
        ...state,
        selected: null,
      };
    case ListActionBuilder.buildUpdateActionType(section):
      if (state.data && state.data.length) {
        const updatedData = state.data.map((item) => (
            item.id === payload.id
                ? {...item, ...payload.changes}
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
