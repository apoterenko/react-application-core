import { IEffectsAction, EffectsAction } from 'redux-effects-promise';

import {
  TRANSPORT_UPDATE_TOKEN_ACTION_TYPE,
  TRANSPORT_DESTROY_TOKEN_ACTION_TYPE,
} from './transport-reducer.interface';
import { ITransportReducerPayloadEntity } from '../definition';

// TODO Move
export class TransportActionBuilder {

  public static buildUpdateTokenAction(data: ITransportReducerPayloadEntity): IEffectsAction {
    return EffectsAction.create(TRANSPORT_UPDATE_TOKEN_ACTION_TYPE, data);
  }

  public static buildDestroyTokenAction(): IEffectsAction {
    return EffectsAction.create(TRANSPORT_DESTROY_TOKEN_ACTION_TYPE);
  }
}
