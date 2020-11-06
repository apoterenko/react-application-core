import {
  AnyT,
  IChannelWrapper,
  IKeyValue,
  IParamsWrapper,
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
 * @stable [17.12.2018]
 */
export interface ISignalRChannelMessageEntity extends IChannelWrapper,
                                                      IParamsWrapper<AnyT[]> {
}

/**
 * @service
 * @stable [04.11.2020]
 */
export interface ISignalRChannel
  extends IChannel<ISignalRChannelConfigEntity> {
}
