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
    IFilterWrapper<(message: IChannelMessageEntity) => boolean> { // TODO Method + generic entity
}

/**
 * @generic-entity
 * @stable [20.04.2019]
 */
export interface IGenericChannelEntity
  extends IMessagesWrapper<IChannelMessageEntity[]>,
    IConnectedWrapper {
}

/**
 * @generic-entity
 * @stable [14.04.2020]
 */
export interface IGenericChannelsEntity
  extends Record<string, IGenericChannelEntity> {
}

/**
 * @wrapper-entity
 * @stable [20.04.2019]
 */
export interface IChannelWrapperEntity<TEntity = IGenericChannelsEntity>
  extends IChannelWrapper<TEntity> {
}

/**
 * @stable [24.09.2019]
 */
export const INITIAL_CHANNELS_ENTITY = Object.freeze<IGenericChannelsEntity>({
});
