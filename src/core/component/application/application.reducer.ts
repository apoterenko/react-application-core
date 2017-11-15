import { AnyAction } from 'redux';

import { convertError } from '../../error';
import {
  IApplicationReadyState,
  INITIAL_APPLICATION_READY_STATE,
} from './application.interface';
import { ApplicationActionBuilder } from './application-action.builder';

export function applicationReadyReducer(state: IApplicationReadyState = INITIAL_APPLICATION_READY_STATE,
                                        action: AnyAction): IApplicationReadyState {
  switch (action.type) {
    case ApplicationActionBuilder.buildPrepareActionType():
      return {
        ...state,
        ready: false,
        progress: true,
        error: null,
      };
    case ApplicationActionBuilder.buildPrepareErrorActionType():
    case ApplicationActionBuilder.buildPrepareAfterErrorActionType():
      return {
        ...state,
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
  }
  return state;
}
