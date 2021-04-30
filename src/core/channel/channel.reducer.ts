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
 * @reducer
 * @stable [30.04.2021]
 * @param state
 * @param action
 */
export const channelReducer = (state: IReduxChannelsEntity = INITIAL_REDUX_CHANNELS_ENTITY,
                               action: IEffectsAction): IReduxChannelsEntity => {
  const channelMessageEntity = Selectors.payloadFromAction<IChannelMessageEntity>(action);
  let previousState;

  switch (action.type) {
    case $CHANNEL_REPLACE_MESSAGES_ACTION_TYPE:
    case $CHANNEL_RECEIVE_MESSAGE_ACTION_TYPE:
      previousState = state[channelMessageEntity.ip] || {};
      break;
  }

  switch (action.type) {
    case $CHANNEL_REPLACE_MESSAGES_ACTION_TYPE:
      return {
        ...state,
        [channelMessageEntity.ip]: {
          ...previousState,
          messages: channelMessageEntity.messages,
        },
      };
    case $CHANNEL_RECEIVE_MESSAGE_ACTION_TYPE:
      switch (channelMessageEntity.name) {
        case CHANNEL_CONNECT_EVENT:
          return {
            ...state,
            [channelMessageEntity.ip]: {
              ...INITIAL_REDUX_CHANNELS_ENTITY,
              connected: true,
            },
          };
        case CHANNEL_DISCONNECT_EVENT:
          return {
            ...state,
            [channelMessageEntity.ip]: {
              ...INITIAL_REDUX_CHANNELS_ENTITY,
              connected: false,
            },
          };
        default:
          return {
            ...state,
            [channelMessageEntity.ip]: {
              ...previousState,
              messages: [
                ...previousState.messages || [],
                channelMessageEntity
              ],
            },
          };
      }
  }
  return state;
};
