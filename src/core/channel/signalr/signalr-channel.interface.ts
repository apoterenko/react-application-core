import {
  IChannelsWrapper,
  IKeyValue,
  IQueryWrapper,
  IChannelWrapper,
  IParamsWrapper,
  AnyT,
} from '../../definitions.interface';
import { IChannel } from '../channel.interface';

/**
 * @stable [12.12.2018]
 */
export interface ISignalRChannelConfigEntity extends IChannelsWrapper<string[]>,
                                                     IQueryWrapper<() => IKeyValue> {
  transport?: string; // TODO
}

/**
 * @stable [17.12.2018]
 */
export interface ISignalRChannelMessageEntity extends IChannelWrapper,
                                                      IParamsWrapper<AnyT[]> {
}

/**
 * @stable [17.12.2018]
 */
export type SignalRChannelMessageEntityT = ISignalRChannelMessageEntity | AnyT;

/**
 * @stable [12.12.2018]
 */
export interface ISignalRChannel extends IChannel<ISignalRChannelConfigEntity,
                                                  SignalRChannelMessageEntityT> {
}
