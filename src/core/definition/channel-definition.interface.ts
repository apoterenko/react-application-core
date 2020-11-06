import {
  ACTION_PREFIX,
  AnyT,
  IChannelWrapper,
  IConnectedWrapper,
  IDataWrapper,
  IIpWrapper,
  IMessagesWrapper,
  INameWrapper,
} from '../definitions.interface';
import { IFluxPayloadEntity } from './entity-definition.interface';
import { PayloadWrapper } from '../channel/protocol/payload.wrapper';

/**
 * @entity
 * @stable [12.06.2020]
 */
export interface IChannelMessageEntity<TData = AnyT>
  extends IDataWrapper<TData>,
    IIpWrapper,
    IMessagesWrapper<any>,
    INameWrapper {
}

/**
 * @flux-entity
 * @stable [06.11.2020]
 */
export interface IFluxChannelMessageEntity<TData = AnyT>
  extends IFluxPayloadEntity<IChannelMessageEntity<TData>> {
}

/**
 * @redux-entity
 * @stable [12.06.2020]
 */
export interface IReduxChannelMessageEntity
  extends IIpWrapper,
    INameWrapper,
    IDataWrapper<AnyT> { // TODO Method + generic entity
  uuid?: string;
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
export interface IReduxChannelHolderEntity<TEntity = IReduxChannelsEntity>
  extends IChannelWrapper<TEntity> {
}

/**
 * @service
 * @stable [06.11.2020]
 */
export interface IChannelClient {
  close(): void;
  emit(event: string, ...args: unknown[]): void;
  on(event: string, callback: (...args: AnyT[]) => void): void;
}

/**
 * @service
 * @stable [06.11.2020]
 */
export interface IChannel<TConfig = {}, TMessage = unknown> {
  connect(ip: string, config?: TConfig): void;
  disconnect(ip): void;
  emitChannelEvent(ip: string, ...args: TMessage[]): void;
  emitEvent(ip: string, event: string, ...args: TMessage[]): void;
  emitRequestPayload(ip: string, requestPayload: PayloadWrapper): void;
  onConnect(ip: string, client: IChannelClient): void;
  onDisconnect(ip: string, client: IChannelClient): void;
  onMessage(ip: string, messageName?: string, payload?: string): void;
}

/**
 * @initial-redux-entity
 * @stable [31.07.2020]
 */
export const INITIAL_REDUX_CHANNELS_ENTITY = Object.freeze<IReduxChannelsEntity>({});

/**
 * @stable [06.11.2020]
 */
export const $CHANNEL_RECEIVE_MESSAGE_ACTION_TYPE = `${ACTION_PREFIX}channel.receive.message`;
export const $CHANNEL_REPLACE_MESSAGES_ACTION_TYPE = `${ACTION_PREFIX}channel.replace.messages`;
export const CHANNEL_CONNECT_EVENT = 'connect';
export const CHANNEL_DISCONNECT_EVENT = 'disconnect';
