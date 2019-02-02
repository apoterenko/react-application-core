import { EffectsActionBuilder } from 'redux-effects-promise';

import { ITransportEntity } from '../entities-definitions.interface';
import { ACTION_PREFIX } from '../definitions.interface';

/* @stable - 12.04.2018 */
export const INITIAL_APPLICATION_TRANSPORT_STATE: ITransportEntity = {
  queue: [],
  token: null,
};

export const TRANSPORT_REQUEST_ACTION_TYPE = `${ACTION_PREFIX}transport.request`;
export const TRANSPORT_REQUEST_DONE_ACTION_TYPE =
  EffectsActionBuilder.buildDoneActionType(TRANSPORT_REQUEST_ACTION_TYPE);
export const TRANSPORT_REQUEST_ERROR_ACTION_TYPE =
  EffectsActionBuilder.buildErrorActionType(TRANSPORT_REQUEST_ACTION_TYPE);
export const TRANSPORT_REQUEST_CANCEL_ACTION_TYPE = `${TRANSPORT_REQUEST_ACTION_TYPE}.cancel`;
export const TRANSPORT_DESTROY_ACTION_TYPE = 'transport.destroy';
export const TRANSPORT_DESTROY_TOKEN_ACTION_TYPE = 'transport.destroy.token';
export const TRANSPORT_UPDATE_TOKEN_ACTION_TYPE = 'transport.update.token';
