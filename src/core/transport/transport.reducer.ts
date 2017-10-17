import { AnyAction } from 'redux';

import {
  INITIAL_APPLICATION_TRANSPORT_STATE,
  IApplicationTransportState,
  TRANSPORT_REQUEST_ACTION_TYPE,
  TRANSPORT_REQUEST_DONE_ACTION_TYPE,
  TRANSPORT_REQUEST_ERROR_ACTION_TYPE,
  TRANSPORT_DESTROY_ACTION_TYPE,
  TRANSPORT_UPDATE_TOKEN_ACTION_TYPE,
  TRANSPORT_DESTROY_TOKEN_ACTION_TYPE,
} from './transport.interface';

export function transportReducer(state: IApplicationTransportState = INITIAL_APPLICATION_TRANSPORT_STATE,
                                 action: AnyAction): IApplicationTransportState {
  const operationId = action.data && action.data.operationId;
  switch (action.type) {
    case TRANSPORT_REQUEST_ACTION_TYPE:
      return {
        ...state,
        queue: operationId
            ? state.queue.concat(action.data.operationId)
            : state.queue,
      };
    case TRANSPORT_REQUEST_ERROR_ACTION_TYPE:
    case TRANSPORT_REQUEST_DONE_ACTION_TYPE:
      return {
        ...state,
        queue: operationId
            ? state.queue.filter((item) => item !== action.data.operationId)
            : state.queue,
      };
    case TRANSPORT_DESTROY_ACTION_TYPE: {
      return {
          ...INITIAL_APPLICATION_TRANSPORT_STATE,
      };
    }
    case TRANSPORT_UPDATE_TOKEN_ACTION_TYPE:
      return {
        ...state,
        token: action.data.token,
      };
    case TRANSPORT_DESTROY_TOKEN_ACTION_TYPE:
      return {
        ...state,
        token: null,
      };
  }
  return state;
}
