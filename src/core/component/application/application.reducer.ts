import { IEffectsAction } from 'redux-effects-promise';

import { ApplicationActionBuilder } from './application-action.builder';
import {
  $RAC_APPLICATION_CUSTOM_ERROR_ACTION_TYPE,
  $RAC_APPLICATION_NOT_READY_ACTION_TYPE,
  $RAC_APPLICATION_PREPARE_ACTION_TYPE,
  $RAC_APPLICATION_PREPARE_ERROR_ACTION_TYPE,
  $RAC_APPLICATION_READY_ACTION_TYPE,
  INITIAL_UNIVERSAL_APPLICATION_ENTITY,
  IUniversalApplicationEntity,
} from '../../definition';
import { ErrorUtils } from '../../util';

export function applicationReducer(state: IUniversalApplicationEntity = INITIAL_UNIVERSAL_APPLICATION_ENTITY,
                                   action: IEffectsAction<string>): IUniversalApplicationEntity {
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
    case $RAC_APPLICATION_CUSTOM_ERROR_ACTION_TYPE:
    case $RAC_APPLICATION_PREPARE_ERROR_ACTION_TYPE:
      return {
        ...state,
        customError: action.type === $RAC_APPLICATION_CUSTOM_ERROR_ACTION_TYPE,
        progress: false,
        error: ErrorUtils.asErrorMessage(action).message,
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
