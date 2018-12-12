import {
  IChannelWrapper,
  IKeyValue,
  IQueryWrapper,
} from '../../definitions.interface';
import { IChannel } from '../channel.interface';

/**
 * @stable [12.12.2018]
 */
export interface ISignalRChannelConfig extends IChannelWrapper,
                                               IQueryWrapper<() => IKeyValue> {
}

/**
 * @stable [12.12.2018]
 */
export interface ISignalRChannel extends IChannel<ISignalRChannelConfig> {
}
