import { AnyAction, Reducer } from 'redux';

import { IChannelWrapper } from '../definitions.interface';
import {
  CHANNEL_MESSAGE_ACTION_TYPE,
  INITIAL_APPLICATION_CHANNEL_STATE,
  CHANNEL_CONNECT_MESSAGE,
  CHANNEL_DISCONNECT_MESSAGE,
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
  switch (action.type) {
    case CHANNEL_MESSAGE_ACTION_TYPE:
      const message: IChannelMessageEntity = action.data;
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
