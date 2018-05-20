import { injectable } from 'inversify';
import { LoggerFactory } from 'ts-smart-logger';
import { Store } from 'redux';
import * as R from 'ramda';

import { defValuesFilter } from '../util';
import { AnyT, UNDEF } from '../definitions.interface';
import { lazyInject, DI_TYPES } from '../di';
import { IApplicationSettings } from '../settings';
import { Command } from './command';
import {
  CHANNEL_CONNECT_MESSAGE,
  CHANNEL_DISCONNECT_MESSAGE,
  CHANNEL_MESSAGE_ACTION_TYPE,
  IChannelService,
  IChannelClient,
} from './channel.interface';
import { IChannelMessageEntity, IApplicationStoreEntity } from '../entities-definitions.interface';

@injectable()
export abstract class BaseChannel implements IChannelService {
  private static logger = LoggerFactory.makeLogger(BaseChannel);

  @lazyInject(DI_TYPES.Settings) protected settings: IApplicationSettings;
  @lazyInject(DI_TYPES.Store) protected appStore: Store<IApplicationStoreEntity>;

  private clients = new Map<string, IChannelClient>();

  public abstract connect(ip: string, config?: AnyT): void;

  public abstract disconnect(ip): void;

  public onConnect(ip: string, client: IChannelClient): void {
    BaseChannel.logger.info(
      `[$BaseChannel][onConnect] Client has been connected successfully. Ip: ${ip}`
    );
    this.onMessage(ip, client, CHANNEL_CONNECT_MESSAGE);
  }

  public onDisconnect(ip: string, client: IChannelClient): void {
    BaseChannel.logger.info(
      `[$BaseChannel][onDisconnect] Client has been connected successfully. Ip: ${ip}`
    );
    this.onMessage(ip, client, CHANNEL_DISCONNECT_MESSAGE);
  }

  public onMessage(ip: string, client: IChannelClient, name?: string, message?: string): void {
    BaseChannel.logger.info(
      () => `[$BaseChannel][onMessage] Client has been received the message ${message || '[-]'}. IP: ${ip}, name: ${name || '[-]'}`
    );
    const payload: IChannelMessageEntity = {
      ip,
      name,
      data: this.toMessage(message),
    };
    this.appStore.dispatch({
      type: CHANNEL_MESSAGE_ACTION_TYPE,
      data: defValuesFilter<IChannelMessageEntity, IChannelMessageEntity>(payload),
    });
  }

  /**
   * @stable [21.05.2018]
   * @param {string} ip
   * @param {string} event
   * @param {AnyT} messages
   */
  public emitEvent(ip: string, event: string, ...messages: AnyT[]): void {
    const client = this.clients.get(ip);
    if (!client) {
      throw new Error(`The client ${ip} doesn't exist!`);
    }
    client.emit(event, ...messages);
  }

  /**
   * @stable [21.05.2018]
   * @param {string} ip
   * @param {AnyT} messages
   */
  public emitChannelEvent(ip: string, ...messages: AnyT[]): void {
    this.emitEvent(ip, this.eventToEmit, messages);
  }

  public emitCommand(ip: string, event: string, command: Command): void {
    this.emitEvent(ip, event, JSON.stringify(command));
  }

  public emitChannelCommand(ip: string, command: Command): void {
    this.emitCommand(ip, this.eventToEmit, command);
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
