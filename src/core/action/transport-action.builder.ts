import { IEffectsAction, EffectsAction } from 'redux-effects-promise';

import {
  $_RAC_TRANSPORT_DESTROY_TOKEN_ACTION_TYPE,
  $_RAC_TRANSPORT_UPDATE_TOKEN_ACTION_TYPE,
  IFluxTransportEntity,
} from '../definition';

export class TransportActionBuilder {

  /**
   * @stable [16.03.2020]
   * @param {IFluxTransportEntity} data
   * @returns {IEffectsAction}
   */
  public static buildUpdateTokenAction(data: IFluxTransportEntity): IEffectsAction {
    return EffectsAction.create($_RAC_TRANSPORT_UPDATE_TOKEN_ACTION_TYPE, data);
  }

  /**
   * @stable [16.03.2020]
   * @returns {IEffectsAction}
   */
  public static buildDestroyTokenAction(): IEffectsAction {
    return EffectsAction.create($_RAC_TRANSPORT_DESTROY_TOKEN_ACTION_TYPE);
  }
}
