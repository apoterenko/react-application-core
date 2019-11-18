import { AnyAction } from 'redux';

import { convertError } from '../../error';
import { ApplicationActionBuilder } from './application-action.builder';
import {
  $RAC_APPLICATION_NOT_READY_ACTION_TYPE,
  $RAC_APPLICATION_PREPARE_ACTION_TYPE,
  $RAC_APPLICATION_PREPARE_ERROR_ACTION_TYPE,
  $RAC_APPLICATION_READY_ACTION_TYPE,
  IApplicationEntity,
  INITIAL_APPLICATION_ENTITY,
} from '../../definition';

export function applicationReducer(state: IApplicationEntity = INITIAL_APPLICATION_ENTITY,
                                   action: AnyAction): IApplicationEntity {
  switch (action.type) {
    case $RAC_APPLICATION_PREPARE_ACTION_TYPE:
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
    case $RAC_APPLICATION_PREPARE_ERROR_ACTION_TYPE:
      return {
        ...state,
        customError: action.type === ApplicationActionBuilder.buildCustomErrorActionType(),
        progress: false,
        error: convertError(action.error).message,
      };
    case $RAC_APPLICATION_READY_ACTION_TYPE:
      return {
        ...state,
        error: null,
        progress: false,
        ready: true,
      };
    case $RAC_APPLICATION_NOT_READY_ACTION_TYPE:
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
