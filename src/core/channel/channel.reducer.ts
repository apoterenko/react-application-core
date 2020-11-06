import { IEffectsAction } from 'redux-effects-promise';

import {
  $CHANNEL_RECEIVE_MESSAGE_ACTION_TYPE,
  $CHANNEL_REPLACE_MESSAGES_ACTION_TYPE,
  CHANNEL_CONNECT_EVENT,
  CHANNEL_DISCONNECT_EVENT,
  IChannelMessageEntity,
  INITIAL_REDUX_CHANNELS_ENTITY,
  IReduxChannelsEntity,
} from '../definition';
import { Selectors } from '../util';

/**
 * @stable [06.11.2020]
 * @param state
 * @param action
 */
export const channelReducer = (state: IReduxChannelsEntity = INITIAL_REDUX_CHANNELS_ENTITY,
                               action: IEffectsAction): IReduxChannelsEntity => {
  const message = Selectors.payloadFromAction<IChannelMessageEntity>(action);

  switch (action.type) {
    case $CHANNEL_REPLACE_MESSAGES_ACTION_TYPE:
      return {
        ...state,
        [message.ip]: {
          ...state[message.ip],
          messages: message.messages,
        },
      };
    case $CHANNEL_RECEIVE_MESSAGE_ACTION_TYPE:
      switch (message.name) {
        case CHANNEL_CONNECT_EVENT:
          return {
            ...state,
            [message.ip]: {
              ...INITIAL_REDUX_CHANNELS_ENTITY,
              connected: true,
            },
          };
        case CHANNEL_DISCONNECT_EVENT:
          return {
            ...state,
            [message.ip]: {
              ...INITIAL_REDUX_CHANNELS_ENTITY,
              connected: false,
            },
          };
        default:
          const previousState = state[message.ip] || {};
          return {
            ...state,
            [message.ip]: {
              ...previousState,
              messages: [
                ...(previousState.messages || []),
                message
              ],
            },
          };
      }
  }
  return state;
}
