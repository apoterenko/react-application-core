import { AnyAction, Reducer } from 'redux';

import { IChannelWrapper } from '../definitions.interface';
import {
  $CHANNEL_MESSAGE_ACTION_TYPE,
  INITIAL_APPLICATION_CHANNEL_STATE,
  CHANNEL_CONNECT_MESSAGE,
  CHANNEL_DISCONNECT_MESSAGE,
  $CHANNEL_CONNECTED_ACTION_TYPE,
  $CHANNEL_DISCONNECTED_ACTION_TYPE,
} from './channel.interface';
import {
  IChannelsEntity,
  IChannelMessageEntity,
} from '../entities-definitions.interface';

/**
 * @stable [21.05.2018]
 * @param {IChannelsEntity} state
 * @param {AnyAction} action
 * @returns {IChannelsEntity}
 */
export function channelReducer(state: IChannelsEntity = INITIAL_APPLICATION_CHANNEL_STATE,
                               action: AnyAction): IChannelsEntity {
  const message: IChannelMessageEntity = action.data;
  switch (action.type) {
    case $CHANNEL_CONNECTED_ACTION_TYPE:
      return {
        ...state,
        [message.ip]: {
          ...state[message.ip],
          connected: true,
        },
      };
    case $CHANNEL_DISCONNECTED_ACTION_TYPE:
      return {
        ...state,
        [message.ip]: {
          ...state[message.ip],
          connected: false,
        },
      };
    case $CHANNEL_MESSAGE_ACTION_TYPE:
      switch (message.name) {
        case CHANNEL_CONNECT_MESSAGE:
          return {
            ...state,
            [message.ip]: {
              ...INITIAL_APPLICATION_CHANNEL_STATE,
              connected: true,
            },
          };
        case CHANNEL_DISCONNECT_MESSAGE:
          return {
            ...state,
            [message.ip]: {
              ...INITIAL_APPLICATION_CHANNEL_STATE,
              connected: false,
            },
          };
        default:
          const current = state[message.ip] || {};
          return {
            ...state,
            [message.ip]: {
              ...current,
              messages: (current.messages || []).concat(message),
            },
          };
      }
  }
  return state;
}

/**
 * @stable [21.05.2018]
 */
export const channelsReducers: IChannelWrapper<Reducer<{}>> = {
  channel: channelReducer,
};
