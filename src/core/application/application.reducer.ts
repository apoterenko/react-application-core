import { AnyAction } from 'redux';

import {
  IApplicationReadyState,
  INITIAL_APPLICATION_READY_STATE,
} from './application.interface';
import { ApplicationActionBuilder } from './application-action.builder';

export function applicationReadyReducer(state: IApplicationReadyState = INITIAL_APPLICATION_READY_STATE,
                                        action: AnyAction): IApplicationReadyState {
  switch (action.type) {
    case ApplicationActionBuilder.buildReadyActionType():
      return {
        ...state,
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
