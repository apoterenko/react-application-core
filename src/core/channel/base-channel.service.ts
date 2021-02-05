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
  NvlUtils,
} from '../util';
import { AnyT } from '../definitions.interface';
import {
  DI_TYPES,
  lazyInject,
} from '../di';
import { ISettingsEntity } from '../settings';
import { PayloadWrapper } from './protocol';
import {
  CHANNEL_CONNECT_EVENT,
  CHANNEL_DISCONNECT_EVENT,
  IChannel,
  IChannelClient,
  IChannelMessageEntity,
  IStoreEntity,
} from '../definition';
import { ChannelActionBuilder } from '../action';

@injectable()
export abstract class BaseChannel<TConfig = {}, TMessage = unknown>
  implements IChannel<TConfig, TMessage> {

  protected static readonly logger = LoggerFactory.makeLogger('BaseChannel');

  @lazyInject(DI_TYPES.Settings) protected readonly settings: ISettingsEntity;
  @lazyInject(DI_TYPES.Store) protected readonly appStore: Store<IStoreEntity>;

  private readonly clients = new Map<string, IChannelClient>();
  /**/
  private $eventToEmit: string;
  private $eventToListen: string | string [];

  /**
   * @stable [06.11.2020]
   * @param ip
   * @param config
   */
  public abstract connect(ip: string, config?: TConfig): Promise<void>;

  /**
   * @stable [04.11.2020]
   * @param ip
   */
  public async disconnect(ip): Promise<void> {
    await this.unregisterClient(ip);
  }

  /**
   * @stable [06.11.2020]
   * @param ip
   * @param client
   */
  public onConnect(ip: string, client: IChannelClient): void {
    this.onMessage(ip, CHANNEL_CONNECT_EVENT);

    BaseChannel.logger.info(`[$BaseChannel][onConnect] The client has been connected successfully. Ip: ${ip}`);
  }

  /**
   * @stable [06.11.2020]
   * @param ip
   * @param client
   */
  public onDisconnect(ip: string, client: IChannelClient): void {
    this.onMessage(ip, CHANNEL_DISCONNECT_EVENT);

    BaseChannel.logger.info(`[$BaseChannel][onDisconnect] The client has been disconnected. Ip: ${ip}`);
  }

  /**
   * @stable [06.11.2020]
   * @param ip
   * @param messageName
   * @param message
   */
  public onMessage(ip: string, messageName?: string, message?: string): void {
    BaseChannel.logger.debug(
      '[$BaseChannel][onMessage] The client received the data', message || '[-]',
      '. Ip:', ip, ', message:', messageName || '[-]'
    );

    this.appStore.dispatch(
      ChannelActionBuilder.buildReceiveMessagePlainAction(
        FilterUtils.defValuesFilter<IChannelMessageEntity, IChannelMessageEntity>({
          data: JsonUtils.parseJson(message),
          ip,
          name: messageName,
        })
      )
    );
  }

  /**
   * @stable [04.11.2020]
   * @param ip
   * @param $event
   * @param args
   */
  public async emitEvent(ip: string, $event: string, ...args: TMessage[]): Promise<void> {
    const client = this.clients.get(ip);
    if (!client) {
      throw new Error(`The client ${ip} doesn't exist!`);
    }
    BaseChannel.logger.debug(
      () => `[$BaseChannel][emitEvent] The client is about to send a message ${args && JSON.stringify(args) || '[-]'
      }. Ip: ${ip}, event: ${$event}`
    );

    await client.emit($event, ...args);
  }

  /**
   * @stable [06.11.2020]
   * @param ip
   * @param args
   */
  public async emitChannelEvent(ip: string, ...args: TMessage[]): Promise<void> {
    await this.emitEvent(ip, this.eventToEmit, ...args);
  }

  /**
   * @stable [06.11.2020]
   * @param ip
   * @param requestPayload
   */
  public async emitRequestPayload(ip: string, requestPayload: PayloadWrapper): Promise<void> {
    await this.emitChannelEvent(ip, JSON.stringify(requestPayload) as AnyT);
  }

  /**
   * @stable [08.11.2020]
   * @param ip
   */
  public hasClient(ip): boolean {
    return this.clients.has(ip);
  }

  /**
   * @stable [05.02.2021]
   * @param $eventToListen
   */
  public setEventToListen(...$eventToListen: string[]): IChannel<TConfig, TMessage> {
    this.$eventToListen = $eventToListen;
    return this;
  }

  /**
   * @stable [05.02.2021]
   * @param $eventToEmit
   */
  public setEventToEmit($eventToEmit: string): IChannel<TConfig, TMessage> {
    this.$eventToEmit = $eventToEmit;
    return this;
  }

  /**
   * @stable [06.11.2020]
   * @param ip
   * @param client
   * @protected
   */
  protected async registerClient(ip: string, client: IChannelClient): Promise<void> {
    this.clients.set(ip, client);

    await Promise.all(
      this.eventToListen
        .map(($eventToListen) => client.on($eventToListen, (message) => this.onMessage(ip, $eventToListen, message)))
    );
    /**/
    await client.on(CHANNEL_CONNECT_EVENT, () => this.onConnect(ip, client));
    await client.on(CHANNEL_DISCONNECT_EVENT, () => this.onDisconnect(ip, client));
  }

  /**
   * @stable [06.11.2020]
   * @param ip
   * @protected
   */
  protected async unregisterClient(ip: string): Promise<void> {
    const client = this.clients.get(ip);
    if (R.isNil(client)) {
      return;
    }
    await client.close();
    this.clients.delete(ip);

    BaseChannel.logger.debug(`[$BaseChannel][unregisterClient] A registration has been canceled. Ip: ${ip}`);
  }

  /**
   * @stable [06.11.2020]
   * @protected
   */
  protected get eventToListen(): string [] {
    return [].concat(
      NvlUtils.nvl(this.$eventToListen, this.settings.channel.eventToListen)
    );
  }

  /**
   * @stable [06.11.2020]
   * @protected
   */
  protected get eventToEmit(): string {
    return NvlUtils.nvl(this.$eventToEmit, this.settings.channel.eventToEmit);
  }
}
