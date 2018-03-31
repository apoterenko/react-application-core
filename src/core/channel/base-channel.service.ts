import { injectable } from 'inversify';
import { LoggerFactory } from 'ts-smart-logger';
import { Store } from 'redux';
import * as R from 'ramda';

import { AnyT } from '../definitions.interface';
import { lazyInject, DI_TYPES } from '../di';
import { IApplicationSettings } from '../settings';
import { Command } from './command';
import { ApplicationStateT } from '../store';
import {
  CHANNEL_CONNECT_MESSAGE,
  CHANNEL_MESSAGE_ACTION_TYPE,
  IApplicationChannel,
  IApplicationChannelClient,
} from './channel.interface';
import { IChannelMessageEntity } from '../entities-definitions.interface';

@injectable()
export abstract class BaseChannel implements IApplicationChannel {
  private static logger = LoggerFactory.makeLogger(BaseChannel);

  @lazyInject(DI_TYPES.Settings) protected settings: IApplicationSettings;
  @lazyInject(DI_TYPES.Store) protected appStore: Store<ApplicationStateT>;

  private clients = new Map<string, IApplicationChannelClient>();

  public abstract connect(ip: string, channel: string): void;

  public onConnect(ip: string, channel: string, client: IApplicationChannelClient): void {
    BaseChannel.logger.info(
      `[$BaseChannel][onConnect] Client has been connected successfully. IP: ${ip}, channel: ${channel}`
    );
    this.onMessage(ip, channel, client, CHANNEL_CONNECT_MESSAGE);
  }

  public onMessage(ip: string, channel: string, client: IApplicationChannelClient, name: string, message?: string): void {
    BaseChannel.logger.info(
      () => `[$BaseChannel][onMessage] Client has been received the message ${message || '[-]'}. IP: ${
        ip}, channel: ${channel}, name: ${name}`
    );
    const payload: IChannelMessageEntity = {
      channel,
      ip,
      name,
      data: this.toMessage(message),
    };
    this.appStore.dispatch({ type: CHANNEL_MESSAGE_ACTION_TYPE, data: payload });
  }

  public emitEvent(channel: string, event: string, ...messages: AnyT[]): void {
    const client = this.clients.get(channel);
    if (!client) {
      throw new Error(`The client ${channel} doesn't exist!`);
    }
    client.emit(event, ...messages);
  }

  public emitChannelEvent(channel: string, ...messages: AnyT[]): void {
    this.emitEvent(channel, this.channelEvent, messages);
  }

  public emitCommand(channel: string, event: string, command: Command): void {
    this.emitEvent(channel, event, JSON.stringify(command));
  }

  public emitChannelCommand(channel: string, command: Command): void {
    this.emitCommand(channel, this.channelEvent, command);
  }

  protected registerClient(ip: string, channel: string, client: IApplicationChannelClient): void {
    this.clients.set(channel, client);

    client.on('connect', () => this.onConnect(ip, channel, client));
    this.registerChannelEvent(ip, channel, client);
  }

  protected registerChannelEvent(ip: string, channel: string, client: IApplicationChannelClient): void {
    client.on(this.channelEvent, (message) => this.onMessage(ip, channel, client, this.channelEvent, message));
  }

  protected get channelEvent(): string {
    return this.settings.channel.channelEvent;
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
