import { AnyAction, Reducer } from 'redux';
import * as R from 'ramda';

import { IChannelWrapper } from '../definitions.interface';
import {
  $CHANNEL_CONNECTED_ACTION_TYPE,
  $CHANNEL_DESTROY_MESSAGE_ACTION_TYPE,
  $CHANNEL_DISCONNECTED_ACTION_TYPE,
  $CHANNEL_MESSAGE_ACTION_TYPE,
  CHANNEL_CONNECT_MESSAGE,
  CHANNEL_DISCONNECT_MESSAGE,
} from './channel.interface';
import {
  IChannelMessageEntity,
  IChannelsEntity,
  INITIAL_CHANNELS_ENTITY,
} from '../definition';

/**
 * @stable [21.05.2018]
 * @param {IChannelsEntity} state
 * @param {AnyAction} action
 * @returns {IChannelsEntity}
 */
export function channelReducer(state: IChannelsEntity = INITIAL_CHANNELS_ENTITY,
                               action: AnyAction): IChannelsEntity {
  let current;
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
    case $CHANNEL_DESTROY_MESSAGE_ACTION_TYPE:
      current = state[message.ip] || {};
      return {
        ...state,
        [message.ip]: {
          ...current,
          messages: R.filter(message.filter, current.messages || []),
        },
      };
    case $CHANNEL_MESSAGE_ACTION_TYPE:
      switch (message.name) {
        case CHANNEL_CONNECT_MESSAGE:
          return {
            ...state,
            [message.ip]: {
              ...INITIAL_CHANNELS_ENTITY,
              connected: true,
            },
          };
        case CHANNEL_DISCONNECT_MESSAGE:
          return {
            ...state,
            [message.ip]: {
              ...INITIAL_CHANNELS_ENTITY,
              connected: false,
            },
          };
        default:
          current = state[message.ip] || {};
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
