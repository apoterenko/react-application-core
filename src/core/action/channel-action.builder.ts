import {
  EffectsAction,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  $CHANNEL_REPLACE_MESSAGES_ACTION_TYPE,
  $CHANNEL_RECEIVE_MESSAGE_ACTION_TYPE,
  IChannelMessageEntity,
  IFluxChannelMessageEntity,
} from '../definition';
import { AnyT } from '../definitions.interface';

export class ChannelActionBuilder {

  /**
   * @stable [06.11.2020]
   * @param payload
   */
  public static buildReceiveMessagePlainAction<TData = AnyT>(payload: IChannelMessageEntity<TData>): IEffectsAction {
    const data: IFluxChannelMessageEntity = {payload};
    return {type: $CHANNEL_RECEIVE_MESSAGE_ACTION_TYPE, data};
  }

  /**
   * @stable [06.11.2020]
   * @param payload
   */
  public static buildReceiveMessageAction<TData = AnyT>(payload: IChannelMessageEntity<TData>): IEffectsAction {
    const plainAction = this.buildReceiveMessagePlainAction(payload);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [06.11.2020]
   * @param payload
   */
  public static buildReplaceMessagesPlainAction<TData = AnyT>(payload: IChannelMessageEntity<TData>): IEffectsAction {
    const data: IFluxChannelMessageEntity = {payload};
    return {type: $CHANNEL_REPLACE_MESSAGES_ACTION_TYPE, data};
  }

  /**
   * @stable [06.11.2020]
   * @param payload
   */
  public static buildReplaceMessageAction<TData = AnyT>(payload: IChannelMessageEntity<TData>): IEffectsAction {
    const plainAction = this.buildReplaceMessagesPlainAction(payload);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }
}
