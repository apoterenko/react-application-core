import { AnyAction, Reducer } from 'redux';
import { IEffectsAction } from 'redux-effects-promise';

import { filter } from '../store/reducer.filter';
import { IChannelWrapper } from '../definition.interface';
import {
  IApplicationChannelState,
  IApplicationChannelMessage,
  CHANNEL_CONNECT_MESSAGE,
  CHANNEL_MESSAGE_ACTION_TYPE,
  INITIAL_APPLICATION_CHANNEL_STATE,
} from './channel.interface';

export function channelReducer(state: IApplicationChannelState = INITIAL_APPLICATION_CHANNEL_STATE,
                               action: AnyAction): IApplicationChannelState {
  switch (action.type) {
    case CHANNEL_MESSAGE_ACTION_TYPE:
      return {
        ...state,
        messages: state.messages.concat(action.data),
      };
  }
  return state;
}

export const IGNORED_MESSAGES = [CHANNEL_CONNECT_MESSAGE];

export const reducerChannelFilter = (action: IEffectsAction): boolean => {
  const message: IApplicationChannelMessage = action.data;
  return !message || !IGNORED_MESSAGES.includes(message.name);
};

export const channelsReducers: IChannelWrapper<Reducer<{}>> = {
  channel: filter(channelReducer, reducerChannelFilter),
};
