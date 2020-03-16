import { IEffectsAction, EffectsAction } from 'redux-effects-promise';

import {
  $_RAC_TRANSPORT_DESTROY_TOKEN_ACTION_TYPE,
  $_RAC_TRANSPORT_UPDATE_TOKEN_ACTION_TYPE,
  ITransportFluxEntity,
} from '../definition';

export class TransportActionBuilder {

  /**
   * @stable [16.03.2020]
   * @param {ITransportFluxEntity} data
   * @returns {IEffectsAction}
   */
  public static buildUpdateTokenAction(data: ITransportFluxEntity): IEffectsAction {
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
