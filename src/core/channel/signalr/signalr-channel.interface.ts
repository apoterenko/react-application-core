import {
  IKeyValue,
  IQueryWrapper,
} from '../../definitions.interface';
import { IChannel } from '../../definition';

/**
 * @stable [12.12.2018]
 */
export interface ISignalRChannelConfigEntity
  extends IQueryWrapper<() => IKeyValue> {
}

/**
 * @service
 * @stable [04.11.2020]
 */
export interface ISignalRChannel
  extends IChannel<ISignalRChannelConfigEntity> {
}

/**
 * @enum
 * @stable [23.04.2021]
 */
export enum SignalRChannelEventCategoriesEnum {
  SIGNALR = 'signalr',
  SIGNALR_ERROR = 'signalr:error',
}

/**
 * @enum
 * @stable [23.04.2021]
 */
export enum SignalRChannelEventsEnum {
  CONNECT = 'connect',
  ON_ALIVE = 'on:alive',
  ON_CLOSE = 'on:close',
  RECONNECT = 'reconnect',
  STOP = 'stop',
}
