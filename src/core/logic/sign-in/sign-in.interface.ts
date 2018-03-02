import { EffectsActionBuilder } from 'redux-effects-promise';

import { ACTION_PREFIX } from '../../definition.interface';

export const SIGN_IN_DONE_ACTION_TYPE = EffectsActionBuilder.buildDoneActionType(`${ACTION_PREFIX}sign.in`);
