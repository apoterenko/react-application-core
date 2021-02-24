import {
  EffectsAction,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  $CHANNEL_RECEIVE_MESSAGE_ACTION_TYPE,
  $CHANNEL_REPLACE_MESSAGES_ACTION_TYPE,
  IChannelMessageEntity,
  IFluxChannelMessageEntity,
  IReduxChannelHolderEntity,
} from '../definition';
import { AnyT } from '../definitions.interface';
import { PayloadWrapper } from '../channel';
import {
  ConditionUtils,
  Selectors,
  TypeUtils,
} from '../util';
import { NotificationActionBuilder } from './notification-action.builder';
import { DiServices } from '../di';

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
  public static buildReplaceMessagesPlainAction<TData = AnyT>(payload: IChannelMessageEntity<TData>): IEffectsAction {
    const data: IFluxChannelMessageEntity = {payload};
    return {type: $CHANNEL_REPLACE_MESSAGES_ACTION_TYPE, data};
  }

  /**
   * @stable [06.11.2020]
   * @param payload
   */
  public static buildReplaceMessagesAction<TData = unknown>(payload: IChannelMessageEntity<TData>): IEffectsAction {
    const plainAction = this.buildReplaceMessagesPlainAction(payload);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [24.02.2021]
   * @param payload
   */
  public static buildClearMessagesAction<TData = unknown>(payload: IChannelMessageEntity<TData>): IEffectsAction {
    return this.buildReplaceMessagesAction({
      ...payload,
      messages: [],
    });
  }

  /**
   * @stable [06.11.2020]
   * @param payload
   * @param wrapper
   * @param errorHandler
   */
  public static buildFilteredCommandResultMessagesAction<TResult = {}>(
    payload: IChannelMessageEntity,
    wrapper: IReduxChannelHolderEntity,
    errorHandler?: (resultData: TResult) => string): IEffectsAction[] {

    const ip = payload.ip;
    const messages = Selectors.channelMessagesByIp(wrapper, ip) || [];
    const currentCommandResult = new PayloadWrapper(payload.data).getCommandResult<TResult>();

    return [
      this.buildReplaceMessagesAction({
        ip,
        messages: messages.filter(
          (message) => ConditionUtils.ifNotNilThanValue(
            new PayloadWrapper(message.data).getCommandResult(),
            (commandResult) => commandResult.getUuid() !== currentCommandResult.getUuid(),
            true
          )
        ),
      }),
      ...ConditionUtils.ifNotNilThanValue(
        currentCommandResult.getData(),
        (resultData) => TypeUtils.isFn(errorHandler)
          ? ConditionUtils.ifNotNilThanValue(
            errorHandler(resultData),
            (errorMessage) => [NotificationActionBuilder.buildErrorAction(errorMessage)],
            []
          )
          : [NotificationActionBuilder.buildErrorAction(DiServices.settings().messages.HARDWARE_ERROR)],
        []
      )
    ];
  }
}
