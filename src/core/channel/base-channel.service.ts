import { injectable } from 'inversify';
import { LoggerFactory } from 'ts-smart-logger';
import { Store } from 'redux';
import * as R from 'ramda';

import { defValuesFilter } from '../util';
import { AnyT, UNDEF } from '../definitions.interface';
import { lazyInject, DI_TYPES } from '../di';
import { IApplicationSettings } from '../settings';
import {
  CHANNEL_CONNECT_MESSAGE,
  CHANNEL_DISCONNECT_MESSAGE,
  $CHANNEL_MESSAGE_ACTION_TYPE,
  IChannel,
  IChannelClient,
} from './channel.interface';
import { PayloadWrapper } from './protocol';
import { IChannelMessageEntity, IApplicationStoreEntity } from '../entities-definitions.interface';

@injectable()
export abstract class BaseChannel implements IChannel {
  private static logger = LoggerFactory.makeLogger(BaseChannel);

  @lazyInject(DI_TYPES.Settings) protected settings: IApplicationSettings;
  @lazyInject(DI_TYPES.Store) protected appStore: Store<IApplicationStoreEntity>;

  private clients = new Map<string, IChannelClient>();

  /**
   * @stable [21.05.2018]
   * @param {string} ip
   * @param {AnyT} config
   */
  public abstract connect(ip: string, config?: AnyT): void;

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
    this.onMessage(ip, client, CHANNEL_CONNECT_MESSAGE);

    BaseChannel.logger.info(
      `[$BaseChannel][onConnect] Client has been connected successfully. Ip: ${ip}`
    );
  }

  /**
   * @stable [21.05.2018]
   * @param {string} ip
   * @param {IChannelClient} client
   */
  public onDisconnect(ip: string, client: IChannelClient): void {
    this.onMessage(ip, client, CHANNEL_DISCONNECT_MESSAGE);

    BaseChannel.logger.info(`[$BaseChannel][onDisconnect] Client has been disconnected. Ip: ${ip}`);
  }

  /**
   * @stable [25.05.2018]
   * @param {string} ip
   * @param {IChannelClient} client
   * @param {string} name
   * @param {string} message
   */
  public onMessage(ip: string, client: IChannelClient, name?: string, message?: string): void {
    BaseChannel.logger.info(
      () => `[$BaseChannel][onMessage] Client received the message ${message && JSON.stringify(message) ||
      '[-]'}. Ip: ${ip}, name: ${name || '[-]'}`
    );
    const payload: IChannelMessageEntity = {ip, name, data: this.toMessage(message)};

    this.appStore.dispatch({
      type: $CHANNEL_MESSAGE_ACTION_TYPE,
      data: defValuesFilter<IChannelMessageEntity, IChannelMessageEntity>(payload),
    });
  }

  /**
   * @stable [21.05.2018]
   * @param {string} ip
   * @param {string} event0
   * @param {AnyT} messages
   */
  public emitEvent(ip: string, event0: string, ...messages: AnyT[]): void {
    const client = this.clients.get(ip);
    if (!client) {
      throw new Error(`The client ${ip} doesn't exist!`);
    }
    BaseChannel.logger.debug(
      () => `[$BaseChannel][emitEvent] Client sent the messages ${
        messages || '[-]'}. Ip: ${ip}, event: ${event0}`
    );

    client.emit(event0, ...messages);
  }

  /**
   * @stable [21.05.2018]
   * @param {string} ip
   * @param {AnyT} messages
   */
  public emitChannelEvent(ip: string, messages: AnyT): void {
    this.emitEvent(ip, this.eventToEmit, messages);
  }

  /**
   * @stable [21.05.2018]
   * @param {string} ip
   * @param {PayloadWrapper} requestPayload
   */
  public emitRequestPayload(ip: string, requestPayload: PayloadWrapper): void {
    this.emitChannelEvent(ip, JSON.stringify(requestPayload));
  }

  /**
   * @stable [21.05.2018]
   * @param {string} ip
   * @param {IChannelClient} client
   */
  protected registerClient(ip: string, client: IChannelClient): void {
    this.clients.set(ip, client);

    client.on('connect', () => this.onConnect(ip, client));
    client.on('disconnect', () => this.onDisconnect(ip, client));
    this.registerChannelEvent(ip, client);
  }

  /**
   * @stable [20.05.2018]
   * @param {string} ip
   */
  protected deregisterClient(ip: string): void {
    const client = this.clients.get(ip);
    if (!client) {
      return;
    }
    client.close();
  }

  /**
   * @stable [21.05.2018]
   * @param {string} ip
   * @param {IChannelClient} client
   */
  protected registerChannelEvent(ip: string, client: IChannelClient): void {
    client.on(this.eventToListen, (message) => this.onMessage(ip, client, UNDEF, message));
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
