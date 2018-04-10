import { AnyAction } from 'redux';

import { convertError } from '../../error';
import { INITIAL_APPLICATION_STATE } from './application-reducer.interface';
import { ApplicationActionBuilder } from './application-action.builder';
import { IApplicationEntity } from '../../entities-definitions.interface';

export function applicationReducer(state: IApplicationEntity = INITIAL_APPLICATION_STATE,
                                   action: AnyAction): IApplicationEntity {
  switch (action.type) {
    case ApplicationActionBuilder.buildPrepareActionType():
      return {
        ...state,
        ready: false,
        progress: true,
        error: null,
      };
    case ApplicationActionBuilder.buildCustomErrorActionType():
    case ApplicationActionBuilder.buildPrepareErrorActionType():
    case ApplicationActionBuilder.buildPrepareAfterErrorActionType():
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
  }
  return state;
}
