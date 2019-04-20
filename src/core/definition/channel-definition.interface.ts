import {
  AnyT,
  IChannelWrapper,
  IConnectedWrapper,
  IDataWrapper,
  IFilterWrapper,
  IIpWrapper,
  IMessagesWrapper,
  INameWrapper,
} from '../definitions.interface';

/**
 * @stable [20.04.2019]
 */
export interface IChannelMessageEntity
  extends IIpWrapper,
    INameWrapper,
    IDataWrapper<AnyT>,
    IFilterWrapper<(message: IChannelMessageEntity) => boolean> {
}

/**
 * @stable [20.04.2019]
 */
export interface IChannelEntity
  extends IMessagesWrapper<IChannelMessageEntity[]>,
    IConnectedWrapper {
}

/**
 * @stable [20.04.2019]
 */
export interface IChannelsEntity
  extends Record<string, IChannelEntity> {
}

/**
 * @stable [20.04.2019]
 */
export interface IChannelWrapperEntity
  extends IChannelWrapper<IChannelsEntity> {
}
