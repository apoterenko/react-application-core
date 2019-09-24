import { AnyAction } from 'redux';

import {
  ITransportEntity,
  INITIAL_TRANSPORT_ENTITY,
} from '../definition';
import { IOperationIdWrapper } from '../definitions.interface';
import {
  TRANSPORT_REQUEST_ACTION_TYPE,
  TRANSPORT_REQUEST_DONE_ACTION_TYPE,
  TRANSPORT_REQUEST_ERROR_ACTION_TYPE,
  TRANSPORT_DESTROY_ACTION_TYPE,
  TRANSPORT_UPDATE_TOKEN_ACTION_TYPE,
  TRANSPORT_DESTROY_TOKEN_ACTION_TYPE,
  TRANSPORT_REQUEST_CANCEL_ACTION_TYPE,
} from './transport-reducer.interface';
import { ifNotNilThanValue } from '../util';

export function transportReducer(state: ITransportEntity = INITIAL_TRANSPORT_ENTITY,
                                 action: AnyAction): ITransportEntity {
  const operationId = ifNotNilThanValue<IOperationIdWrapper, string>(action.data, (data) => data.operationId);
  switch (action.type) {
    case TRANSPORT_REQUEST_ACTION_TYPE:
      return {
        ...state,
        queue: operationId
            ? state.queue.concat(operationId)
            : state.queue,
      };
    case TRANSPORT_REQUEST_CANCEL_ACTION_TYPE:
    case TRANSPORT_REQUEST_ERROR_ACTION_TYPE:
    case TRANSPORT_REQUEST_DONE_ACTION_TYPE:
      return {
        ...state,
        queue: operationId
            ? state.queue.filter((item) => item !== operationId)
            : state.queue,
      };
    case TRANSPORT_DESTROY_ACTION_TYPE: {
      return {
          ...INITIAL_TRANSPORT_ENTITY,
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
