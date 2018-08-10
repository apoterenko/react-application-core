import { IEffectsAction, EffectsAction } from 'redux-effects-promise';

import { INITIAL_APPLICATION_LAYOUT_STATE, LAYOUT_UPDATE_ACTION_TYPE } from './layout.interface';
import { IPayloadWrapper } from '../../definitions.interface';

export class LayoutActionBuilder {

  /**
   * @stable [11.08.2018]
   * @returns {IEffectsAction}
   */
  public static buildDestroyAction(): IEffectsAction {
    const payloadWrapper: IPayloadWrapper = {payload: INITIAL_APPLICATION_LAYOUT_STATE};
    return EffectsAction.create(LAYOUT_UPDATE_ACTION_TYPE, payloadWrapper);
  }
}
