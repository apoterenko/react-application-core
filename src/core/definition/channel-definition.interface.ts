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
 * @redux-entity
 * @stable [12.06.2020]
 */
export interface IReduxChannelMessageEntity
  extends IIpWrapper,
    INameWrapper,
    IDataWrapper<AnyT>,
    IFilterWrapper<(message: IReduxChannelMessageEntity) => boolean> { // TODO Method + generic entity
}

/**
 * @redux-entity
 * @stable [12.06.2020]
 */
export interface IReduxChannelEntity
  extends IMessagesWrapper<IReduxChannelMessageEntity[]>,
    IConnectedWrapper {
}

/**
 * @redux-entity
 * @stable [12.06.2020]
 */
export interface IReduxChannelsEntity
  extends Record<string, IReduxChannelEntity> {
}

/**
 * @redux-holder-entity
 * @stable [12.06.2020]
 */
export interface IReduxHolderChannelEntity<TEntity = IReduxChannelsEntity>
  extends IChannelWrapper<TEntity> {
}

/**
 * @stable [24.09.2019]
 */
export const INITIAL_CHANNELS_ENTITY = Object.freeze<IReduxChannelsEntity>({
});
