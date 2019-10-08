import { injectable } from 'inversify';
import { LoggerFactory, ILogger } from 'ts-smart-logger';
import { Store } from 'redux';
import * as R from 'ramda';

import { defValuesFilter } from '../util';
import { AnyT, UNDEF } from '../definitions.interface';
import { lazyInject, DI_TYPES } from '../di';
import { ISettingsEntity } from '../settings';
import {
  CHANNEL_CONNECT_MESSAGE,
  CHANNEL_DISCONNECT_MESSAGE,
  CHANNEL_CONNECT_EVENT,
  CHANNEL_DISCONNECT_EVENT,
  $CHANNEL_MESSAGE_ACTION_TYPE,
  IChannel,
  IChannelClient,
} from './channel.interface';
import { PayloadWrapper } from './protocol';
import {
  IChannelMessageEntity,
  IStoreEntity,
} from '../definition';

@injectable()
export abstract class BaseChannel<TConfig = AnyT, TMessage = AnyT> implements IChannel<TConfig, TMessage> {
  protected static logger = LoggerFactory.makeLogger('BaseChannel');

  @lazyInject(DI_TYPES.Settings) protected settings: ISettingsEntity;
  @lazyInject(DI_TYPES.Store) protected appStore: Store<IStoreEntity>;

  private clients = new Map<string, IChannelClient>();

  /**
   * @stable [21.05.2018]
   * @param {string} ip
   * @param {TConfig} config
   */
  public abstract connect(ip: string, config?: TConfig): void;

  /**
   * @stable [21.05.2018]
   * @param ip
   */
  public abstract disconnect(ip): void;

  /**
   * @stable [21.05.2018]
   * @param {string} ip
   * @param {IChannelClient} client
   */
  public onConnect(ip: string, client: IChannelClient): void {
    this.onMessage(ip, CHANNEL_CONNECT_MESSAGE);

    BaseChannel.logger.info(`[$BaseChannel][onConnect] The client has been connected successfully. Ip: ${ip}`);
  }

  /**
   * @stable [21.05.2018]
   * @param {string} ip
   * @param {IChannelClient} client
   */
  public onDisconnect(ip: string, client: IChannelClient): void {
    this.onMessage(ip, CHANNEL_DISCONNECT_MESSAGE);

    BaseChannel.logger.info(`[$BaseChannel][onDisconnect] The client has been disconnected. Ip: ${ip}`);
  }

  /**
   * @stable [25.05.2018]
   * @param {string} ip
   * @param {string} messageName
   * @param {AnyT} payload
   */
  public onMessage(ip: string, messageName?: string, payload?: AnyT): void {
    BaseChannel.logger.debug(
      '[$BaseChannel][onMessage] The client received the data', payload || '[-]',
      '. Ip:', ip, ', message:', messageName || '[-]'
    );

    this.appStore.dispatch({
      type: $CHANNEL_MESSAGE_ACTION_TYPE,
      data: defValuesFilter<IChannelMessageEntity, IChannelMessageEntity>({
        ip, name: messageName, data: this.toMessage(payload),
      }),
    });
  }

  /**
   * @stable [21.05.2018]
   * @param {string} ip
   * @param {string} event0
   * @param {TMessage} args
   */
  public emitEvent(ip: string, event0: string, ...args: TMessage[]): void {
    const client = this.clients.get(ip);
    if (!client) {
      throw new Error(`The client ${ip} doesn't exist!`);
    }
    BaseChannel.logger.debug(
      () => `[$BaseChannel][emitEvent] The client is about to send a message ${args && JSON.stringify(args) || '[-]'
      }. Ip: ${ip}, event: ${event0}`
    );

    client.emit(event0, ...args);
  }

  /**
   * @stable [12.12.2018]
   * @param {string} ip
   * @param {TMessage} args
   */
  public emitChannelEvent(ip: string, ...args: TMessage[]): void {
    this.emitEvent(ip, this.eventToEmit, ...args);
  }

  /**
   * @stable [21.05.2018]
   * @param {string} ip
   * @param {PayloadWrapper} requestPayload
   */
  public emitRequestPayload(ip: string, requestPayload: PayloadWrapper): void {
    this.emitChannelEvent(ip, JSON.stringify(requestPayload) as AnyT);
  }

  /**
   * @stable [21.05.2018]
   * @param {string} ip
   * @param {IChannelClient} client
   */
  protected registerClient(ip: string, client: IChannelClient): void {
    this.clients.set(ip, client);

    client.on(CHANNEL_CONNECT_EVENT, () => this.onConnect(ip, client));
    client.on(CHANNEL_DISCONNECT_EVENT, () => this.onDisconnect(ip, client));
    this.registerChannelEvent(ip, client);
  }

  /**
   * @stable [11.12.2018]
   * @param {string} ip
   */
  protected unregisterClient(ip: string): void {
    const client = this.clients.get(ip);
    if (R.isNil(client)) {
      return;
    }
    client.close();
    this.clients.delete(ip);

    BaseChannel.logger.debug(`[$BaseChannel][unregisterClient] A registration has been canceled. Ip: ${ip}`);
  }

  /**
   * @stable [21.05.2018]
   * @param {string} ip
   * @param {IChannelClient} client
   */
  protected registerChannelEvent(ip: string, client: IChannelClient): void {
    client.on(this.eventToListen, (message) => this.onMessage(ip, UNDEF, message));
  }

  /**
   * @stable [21.05.2018]
   * @returns {string}
   */
  protected get eventToListen(): string {
    return this.settings.channel.eventToListen;
  }

  /**
   * @stable [21.05.2018]
   * @returns {string}
   */
  protected get eventToEmit(): string {
    return this.settings.channel.eventToEmit;
  }

  /**
   * @stable [21.05.2018]
   * @param {string} message
   * @returns {AnyT}
   */
  private toMessage(message: string): AnyT {
    if (R.isNil(message)) {
      return message;
    }
    try {
      return JSON.parse(message);
    } catch (e) {
      return message;
    }
  }
}
