import { injectable } from 'inversify';
import {
  ILogger,
  LoggerFactory,
} from 'ts-smart-logger';
import { Store } from 'redux';
import * as R from 'ramda';

import {
  FilterUtils,
  JsonUtils,
} from '../util';
import {
  AnyT,
  UNDEF,
} from '../definitions.interface';
import {
  DI_TYPES,
  lazyInject,
} from '../di';
import { ISettingsEntity } from '../settings';
import {
  $CHANNEL_MESSAGE_ACTION_TYPE,
  CHANNEL_CONNECT_EVENT,
  CHANNEL_CONNECT_MESSAGE,
  CHANNEL_DISCONNECT_EVENT,
  CHANNEL_DISCONNECT_MESSAGE,
  IChannel,
  IChannelClient,
} from './channel.interface';
import { PayloadWrapper } from './protocol';
import {
  IReduxChannelMessageEntity,
  IStoreEntity,
} from '../definition';

@injectable()
export abstract class BaseChannel<TConfig = AnyT, TMessage = unknown> implements IChannel<TConfig, TMessage> {
  protected static readonly logger = LoggerFactory.makeLogger('BaseChannel');

  @lazyInject(DI_TYPES.Settings) protected readonly settings: ISettingsEntity;
  @lazyInject(DI_TYPES.Store) protected readonly appStore: Store<IStoreEntity>;

  private readonly clients = new Map<string, IChannelClient>();

  /**
   * @stable [06.11.2020]
   * @param ip
   * @param config
   */
  public abstract connect(ip: string, config?: TConfig): void;

  /**
   * @stable [04.11.2020]
   * @param ip
   */
  public disconnect(ip): void {
    this.unregisterClient(ip);
  }

  /**
   * @stable [06.11.2020]
   * @param ip
   * @param client
   */
  public onConnect(ip: string, client: IChannelClient): void {
    this.onMessage(ip, CHANNEL_CONNECT_MESSAGE);

    BaseChannel.logger.info(`[$BaseChannel][onConnect] The client has been connected successfully. Ip: ${ip}`);
  }

  /**
   * @stable [06.11.2020]
   * @param ip
   * @param client
   */
  public onDisconnect(ip: string, client: IChannelClient): void {
    this.onMessage(ip, CHANNEL_DISCONNECT_MESSAGE);

    BaseChannel.logger.info(`[$BaseChannel][onDisconnect] The client has been disconnected. Ip: ${ip}`);
  }

  /**
   * @stable [06.11.2020]
   * @param ip
   * @param messageName
   * @param payload
   */
  public onMessage(ip: string, messageName?: string, payload?: AnyT): void {
    BaseChannel.logger.debug(
      '[$BaseChannel][onMessage] The client received the data', payload || '[-]',
      '. Ip:', ip, ', message:', messageName || '[-]'
    );

    this.appStore.dispatch({
      type: $CHANNEL_MESSAGE_ACTION_TYPE,
      data: FilterUtils.defValuesFilter<IReduxChannelMessageEntity, IReduxChannelMessageEntity>({
        data: JsonUtils.parseJson(payload),
        ip,
        name: messageName,
      }),
    });
  }

  /**
   * @stable [04.11.2020]
   * @param ip
   * @param $event
   * @param args
   */
  public emitEvent(ip: string, $event: string, ...args: TMessage[]): void {
    const client = this.clients.get(ip);
    if (!client) {
      throw new Error(`The client ${ip} doesn't exist!`);
    }
    BaseChannel.logger.debug(
      () => `[$BaseChannel][emitEvent] The client is about to send a message ${args && JSON.stringify(args) || '[-]'
      }. Ip: ${ip}, event: ${$event}`
    );

    client.emit($event, ...args);
  }

  /**
   * @stable [06.11.2020]
   * @param ip
   * @param args
   */
  public emitChannelEvent(ip: string, ...args: TMessage[]): void {
    this.emitEvent(ip, this.eventToEmit, ...args);
  }

  /**
   * @stable [06.11.2020]
   * @param ip
   * @param requestPayload
   */
  public emitRequestPayload(ip: string, requestPayload: PayloadWrapper): void {
    this.emitChannelEvent(ip, JSON.stringify(requestPayload) as AnyT);
  }

  /**
   * @stable [06.11.2020]
   * @param ip
   * @param client
   * @protected
   */
  protected registerClient(ip: string, client: IChannelClient): void {
    this.clients.set(ip, client);

    client.on(CHANNEL_CONNECT_EVENT, () => this.onConnect(ip, client));
    client.on(CHANNEL_DISCONNECT_EVENT, () => this.onDisconnect(ip, client));
    this.registerChannelEvent(ip, client);
  }

  /**
   * @stable [06.11.2020]
   * @param ip
   * @protected
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
   * @stable [06.11.2020]
   * @param ip
   * @param client
   * @protected
   */
  protected registerChannelEvent(ip: string, client: IChannelClient): void {
    client.on(this.eventToListen, (message) => this.onMessage(ip, UNDEF, message));
  }

  /**
   * @stable [06.11.2020]
   * @protected
   */
  protected get eventToListen(): string {
    return this.settings.channel.eventToListen;
  }

  /**
   * @stable [06.11.2020]
   * @protected
   */
  protected get eventToEmit(): string {
    return this.settings.channel.eventToEmit;
  }
}
