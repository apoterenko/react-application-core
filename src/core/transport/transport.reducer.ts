import {
  IEffectsAction,
} from 'redux-effects-promise';

import {
  $_RAC_TRANSPORT_DESTROY_TOKEN_ACTION_TYPE,
  $_RAC_TRANSPORT_UPDATE_TOKEN_ACTION_TYPE,
  IFluxTransportEntity,
  INITIAL_REDUX_TRANSPORT_ENTITY,
  IReduxTransportEntity,
} from '../definition';
import {
  $RAC_TRANSPORT_REQUEST_ACTION_TYPE,
  $RAC_TRANSPORT_REQUEST_DONE_ACTION_TYPE,
  TRANSPORT_DESTROY_ACTION_TYPE,
  TRANSPORT_REQUEST_CANCEL_ACTION_TYPE,
  TRANSPORT_REQUEST_ERROR_ACTION_TYPE,
} from './transport-reducer.interface';
import { Selectors } from '../util';

export function transportReducer(state: IReduxTransportEntity = INITIAL_REDUX_TRANSPORT_ENTITY,
                                 action: IEffectsAction): IReduxTransportEntity {
  const fluxTransportEntity = Selectors.data<IFluxTransportEntity>(action);
  const operationId = fluxTransportEntity?.operationId;

  switch (action.type) {
    case $RAC_TRANSPORT_REQUEST_ACTION_TYPE:
      return {
        ...state,
        queue: operationId
            ? state.queue.concat(operationId)
            : state.queue,
      };
    case TRANSPORT_REQUEST_CANCEL_ACTION_TYPE:
    case TRANSPORT_REQUEST_ERROR_ACTION_TYPE:
    case $RAC_TRANSPORT_REQUEST_DONE_ACTION_TYPE:
      return {
        ...state,
        queue: operationId
            ? state.queue.filter((item) => item !== operationId)
            : state.queue,
      };
    case TRANSPORT_DESTROY_ACTION_TYPE: {
      return {
          ...INITIAL_REDUX_TRANSPORT_ENTITY,
      };
    }
    case $_RAC_TRANSPORT_UPDATE_TOKEN_ACTION_TYPE:
      return {
        ...state,
        token: fluxTransportEntity.token,
      };
    case $_RAC_TRANSPORT_DESTROY_TOKEN_ACTION_TYPE:
      return {
        ...state,
        token: null,
      };
  }
  return state;
}
