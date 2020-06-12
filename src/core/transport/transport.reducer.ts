import {
  IEffectsAction,
} from 'redux-effects-promise';

import {
  $_RAC_TRANSPORT_DESTROY_TOKEN_ACTION_TYPE,
  $_RAC_TRANSPORT_UPDATE_TOKEN_ACTION_TYPE,
  INITIAL_TRANSPORT_ENTITY,
  IReduxTransportEntity,
  IFluxTransportEntity,
} from '../definition';
import {
  TRANSPORT_DESTROY_ACTION_TYPE,
  $RAC_TRANSPORT_REQUEST_ACTION_TYPE,
  TRANSPORT_REQUEST_CANCEL_ACTION_TYPE,
  $RAC_TRANSPORT_REQUEST_DONE_ACTION_TYPE,
  TRANSPORT_REQUEST_ERROR_ACTION_TYPE,
} from './transport-reducer.interface';
import {
  ifNotNilThanValue,
  selectData,
} from '../util';

export function transportReducer(state: IReduxTransportEntity = INITIAL_TRANSPORT_ENTITY,
                                 action: IEffectsAction): IReduxTransportEntity {
  const payloadData = selectData<IFluxTransportEntity>(action);
  const operationId = ifNotNilThanValue(payloadData, (data) => data.operationId);

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
          ...INITIAL_TRANSPORT_ENTITY,
      };
    }
    case $_RAC_TRANSPORT_UPDATE_TOKEN_ACTION_TYPE:
      return {
        ...state,
        token: payloadData.token,
      };
    case $_RAC_TRANSPORT_DESTROY_TOKEN_ACTION_TYPE:
      return {
        ...state,
        token: null,
      };
  }
  return state;
}
