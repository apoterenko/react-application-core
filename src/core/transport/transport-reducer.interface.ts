import { EffectsActionBuilder } from 'redux-effects-promise';

import { ACTION_PREFIX } from '../definitions.interface';

export const $RAC_TRANSPORT_REQUEST_ACTION_TYPE = `${ACTION_PREFIX}transport.request`;
export const $RAC_TRANSPORT_REQUEST_DONE_ACTION_TYPE =
  EffectsActionBuilder.buildDoneActionType($RAC_TRANSPORT_REQUEST_ACTION_TYPE);
export const TRANSPORT_REQUEST_ERROR_ACTION_TYPE =
  EffectsActionBuilder.buildErrorActionType($RAC_TRANSPORT_REQUEST_ACTION_TYPE);
export const TRANSPORT_REQUEST_CANCEL_ACTION_TYPE = `${$RAC_TRANSPORT_REQUEST_ACTION_TYPE}.cancel`;
export const TRANSPORT_DESTROY_ACTION_TYPE = 'transport.destroy';
