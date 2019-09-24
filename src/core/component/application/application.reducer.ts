import { AnyAction } from 'redux';

import { convertError } from '../../error';
import { ApplicationActionBuilder } from './application-action.builder';
import {
  IApplicationEntity,
  INITIAL_APPLICATION_ENTITY,
} from '../../definition';

export function applicationReducer(state: IApplicationEntity = INITIAL_APPLICATION_ENTITY,
                                   action: AnyAction): IApplicationEntity {
  switch (action.type) {
    case ApplicationActionBuilder.buildPrepareActionType():
      return {
        ...state,
        ready: false,
        progress: true,
        error: null,
      };
    case ApplicationActionBuilder.buildPathActionType():
      return {
        ...state,
        path: action.data,
      };
    case ApplicationActionBuilder.buildCustomErrorActionType():
    case ApplicationActionBuilder.buildPrepareErrorActionType():
    case ApplicationActionBuilder.buildPrepareDoneErrorActionType():
      return {
        ...state,
        customError: action.type === ApplicationActionBuilder.buildCustomErrorActionType(),
        progress: false,
        error: convertError(action.error).message,
      };
    case ApplicationActionBuilder.buildReadyActionType():
      return {
        ...state,
        error: null,
        progress: false,
        ready: true,
      };
    case ApplicationActionBuilder.buildNotReadyActionType():
      return {
        ...state,
        ready: false,
      };
    case ApplicationActionBuilder.buildAuthorizedActionType():
      return {
        ...state,
        authorized: true,
      };
    case ApplicationActionBuilder.buildUnauthorizedActionType():
      return {
        ...state,
        authorized: false,
      };
  }
  return state;
}
