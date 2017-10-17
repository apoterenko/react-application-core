import { IEffectsAction, EffectsAction } from 'redux-effects-promise';

import { AnyT } from '../definition.interface';
import {
  TRANSPORT_UPDATE_TOKEN_ACTION_TYPE,
  TRANSPORT_DESTROY_TOKEN_ACTION_TYPE,
} from './transport.interface';

export class TransportActionBuilder {

  public static buildUpdateTokenAction(data: AnyT): IEffectsAction {
    return EffectsAction.create(TRANSPORT_UPDATE_TOKEN_ACTION_TYPE, data);
  }

  public static buildDestroyTokenAction(): IEffectsAction {
    return EffectsAction.create(TRANSPORT_DESTROY_TOKEN_ACTION_TYPE);
  }
}
