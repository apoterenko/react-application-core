import * as signalR from '@microsoft/signalr';
import { injectable } from 'inversify';
import {
  ILogger,
  LoggerFactory,
} from 'ts-smart-logger';

import { BaseChannel } from '../base-channel.service';
import {
  ArrayUtils,
  CalcUtils,
  ConditionUtils,
  DelayedTask,
  FilterUtils,
  TypeUtils,
  UrlUtils,
  UuidUtils,
} from '../../util';
import {
  CHANNEL_CONNECT_EVENT,
  CHANNEL_DISCONNECT_EVENT,
  ILogManager,
} from '../../definition';
import {
  ISignalRChannelConfigEntity,
  SignalRChannelEventCategoriesEnum,
} from './signalr-channel.interface';
import {
  DI_TYPES,
  lazyInject,
} from '../../di';

/**
 * @service
 * @stable [04.11.2020]
 */
@injectable()
export class SignalRChannel extends BaseChannel<ISignalRChannelConfigEntity> {
  protected static readonly logger = LoggerFactory.makeLogger('SignalRChannel');

  private static readonly $$CONNECTION_ALIVE = '$$connectionAlive';
  private static readonly $$CONNECTION_DIED = '$$connectionDied';
  private static readonly $$CONNECTION_IN_PROGRESS = '$$connectionInProgress';
  private static readonly $$RECONNECT_TASK = '$$reconnectTask';
  private static readonly RETRY_DELAYS = ArrayUtils
    .makeArray(500)
    .map((_, index) => Math.round(index * 1.2 * 1000))
    .concat(null);

  @lazyInject(DI_TYPES.LogManager) private readonly logManager: ILogManager;

  /**
   * @stable [04.11.2020]
   */
  constructor() {
    super();

    this.onMessage = this.onMessage.bind(this);
  }

  /**
   * @stable [23.04.2021]
   * @param ip
   * @param cfg
   */
  public async connect(ip: string, cfg?: ISignalRChannelConfigEntity): Promise<void> {
    if (this.hasClient(ip)) {
      SignalRChannel.logger.info(this.getMessage('connect', ip, '[-]', 'Client is already registered'));
      return;
    }
    const {
      query,
    } = cfg || {};

    const uuid = UuidUtils.uuid();
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(
        UrlUtils.buildParameterizedURI(ip, CalcUtils.calc(query))
      )
      .withAutomaticReconnect(SignalRChannel.RETRY_DELAYS)
      .build();

    let disconnectCallback;

    await this.registerClient(ip, {
      uuid,
      on: async (event: string, callback: (...args: unknown[]) => void): Promise<void> => {
        if (this.eventToListen.includes(event)) {
          connection.on(event, callback);
          return;
        }
        switch (event) {
          case CHANNEL_CONNECT_EVENT:
            connection.onreconnecting(() => this.onConnectionClose(connection, disconnectCallback, 'onreconnecting', ip, uuid));
            connection.onreconnected(() => this.onConnectionAlive(connection, callback, 'onreconnected', ip, uuid));
            connection.onclose(() => this.onConnectionClose(connection, disconnectCallback, 'onclose', ip, uuid));

            await this.doConnect(connection, callback, ip, uuid);
            break;
          case CHANNEL_DISCONNECT_EVENT:
            disconnectCallback = callback;
            break;
        }
      },
      emit: async (event: string, ...args: unknown[]): Promise<void> => {
        await connection.send(event, ...args);
      },
      close: async (): Promise<void> => {
        if (this.isConnectionDied(connection)) {
          SignalRChannel.logger.info(this.getMessage('close', ip, uuid, 'Connection is already died => do nothing'));
          return;
        }
        this.setConnectionDied(connection, true);

        this.setConnectionInProgress(connection, true);
        try {
          await connection.stop();
          SignalRChannel.logger.info(this.getMessage('close', ip, uuid, 'Connection has been stopped successfully'));
        } catch (e) {

          SignalRChannel.logger.error(this.getMessageError('close', ip, uuid), e);
          this.logManager.send(
            SignalRChannelEventCategoriesEnum.SIGNALR_ERROR,
            'close',
            FilterUtils.defValuesFilter({ip, uuid, error: e.message})
          );
        } finally {
          this.setConnectionInProgress(connection, false);
        }
      },
    });
  }

  /**
   * @stable [23.04.2021]
   * @param connection
   * @param callback
   * @param ip
   * @param uuid
   */
  private async doConnect(connection: signalR.HubConnection, callback: (...args: unknown[]) => void, ip: string, uuid: string): Promise<void> {
    const isConnectionInProgress = this.isConnectionInProgress(connection);
    const isConnectionDied = this.isConnectionDied(connection);
    const isConnectionAlive = this.isConnectionAlive(connection);

    if (isConnectionInProgress
      || isConnectionDied
      || isConnectionAlive) {

      SignalRChannel.logger.error(this.getMessage('doConnect', ip, uuid,
        `Do nothing because: isConnectionInProgress[${isConnectionInProgress}], isConnectionDied[${
          isConnectionDied}], isConnectionAlive[${isConnectionAlive}]`));
      return;
    }

    this.setConnectionInProgress(connection, true);
    try {
      await connection.start();
    } catch (e) {

      SignalRChannel.logger.error(this.getMessageError('doConnect', ip, uuid), e);
      this.logManager.send(
        SignalRChannelEventCategoriesEnum.SIGNALR_ERROR,
        'doConnect',
        FilterUtils.defValuesFilter({ip, uuid, error: e.message})
      );

      this.setConnectionInProgress(connection, false);
      this.doReconnect(connection, callback, ip, uuid);
      return;
    }
    this.setConnectionInProgress(connection, false);

    this.onConnectionAlive(connection, callback, 'doConnect', ip, uuid);
  }

  /**
   * @stable [23.04.2021]
   * @param connection
   * @param callback
   * @param ip
   * @param uuid
   */
  private doReconnect(connection: signalR.HubConnection, callback: (...args: unknown[]) => void, ip: string, uuid: string): void {
    SignalRChannel.logger.debug(this.getMessage('doReconnect', ip, uuid));
    this.logManager.send(
      SignalRChannelEventCategoriesEnum.SIGNALR,
      'doReconnect',
      FilterUtils.defValuesFilter({ip, uuid})
    );

    let reconnectTask = this.getReconnectTask(connection);

    ConditionUtils.ifNilThanValue(
      reconnectTask,
      () => {
        reconnectTask = new DelayedTask(
          async () => {
            SignalRChannel.logger.debug(this.getMessage('doReconnect:task', ip, uuid));
            await this.doConnect(connection, callback, ip, uuid);
          },
          2000
        );
        this.setReconnectTask(connection, reconnectTask);
      }
    );
    reconnectTask.start();
  }

  /**
   * @stable [23.04.2021]
   * @param connection
   */
  private stopReconnectTask(connection: signalR.HubConnection): void {
    ConditionUtils.ifNotNilThanValue(
      this.getReconnectTask(connection),
      (reconnectTask) => {
        reconnectTask.stop();
        this.setReconnectTask(connection, null);
      }
    );
  }

  /**
   * @stable [23.04.2021]
   * @param connection
   * @param callback
   * @param method
   * @param ip
   * @param uuid
   */
  private onConnectionAlive(connection: signalR.HubConnection,
                            callback: (...args: unknown[]) => void,
                            method: string,
                            ip: string,
                            uuid: string): void {
    SignalRChannel.logger.info(this.getMessage(method, ip, uuid, 'Server is connected/reconnected'));
    this.logManager.send(
      SignalRChannelEventCategoriesEnum.SIGNALR,
      `onConnectionAlive:${method}`,
      FilterUtils.defValuesFilter({ip, uuid})
    );

    this.setConnectionAlive(connection, true);

    if (TypeUtils.isFn(callback)) {
      callback();
    }
  }

  /**
   * @stable [23.04.2021]
   * @param connection
   * @param callback
   * @param method
   * @param ip
   * @param uuid
   */
  private onConnectionClose(connection: signalR.HubConnection,
                            callback: (...args: unknown[]) => void,
                            method: string,
                            ip: string,
                            uuid: string): void {
    SignalRChannel.logger.info(this.getMessage(method, ip, uuid, 'Connection has been closed'));
    this.logManager.send(
      SignalRChannelEventCategoriesEnum.SIGNALR,
      `onConnectionClose:${method}`,
      FilterUtils.defValuesFilter({ip, uuid})
    );

    this.setConnectionAlive(connection, false);

    if (TypeUtils.isFn(callback)) {
      callback();
    }
  }

  /**
   * @stable [23.04.2021]
   * @param connection
   */
  private getReconnectTask(connection: signalR.HubConnection): DelayedTask {
    return Reflect.get(connection, SignalRChannel.$$RECONNECT_TASK);
  }

  /**
   * @stable [23.04.2021]
   * @param connection
   * @param task
   */
  private setReconnectTask(connection: signalR.HubConnection, task: DelayedTask): void {
    Reflect.set(connection, SignalRChannel.$$RECONNECT_TASK, task);
  }

  /**
   * @stable [23.04.2021]
   * @param connection
   * @param alive
   */
  private setConnectionAlive(connection: signalR.HubConnection, alive: boolean): void {
    Reflect.set(connection, SignalRChannel.$$CONNECTION_ALIVE, alive);

    if (alive) {
      this.stopReconnectTask(connection);
    }
  }

  /**
   * @stable [23.04.2021]
   * @param connection
   * @param died
   */
  private setConnectionDied(connection: signalR.HubConnection, died: boolean): void {
    Reflect.set(connection, SignalRChannel.$$CONNECTION_DIED, died);

    if (died) {
      this.stopReconnectTask(connection);
    }
  }

  /**
   * @stable [23.04.2021]
   * @param connection
   * @param inProgress
   */
  private setConnectionInProgress(connection: signalR.HubConnection, inProgress: boolean): void {
    Reflect.set(connection, SignalRChannel.$$CONNECTION_IN_PROGRESS, inProgress);
  }

  /**
   * @stable [23.04.2021]
   * @param connection
   */
  private isConnectionInProgress(connection: signalR.HubConnection): boolean {
    return !!Reflect.get(connection, SignalRChannel.$$CONNECTION_IN_PROGRESS);
  }

  /**
   * @stable [23.04.2021]
   * @param connection
   */
  private isConnectionAlive(connection: signalR.HubConnection): boolean {
    return !!Reflect.get(connection, SignalRChannel.$$CONNECTION_ALIVE);
  }

  /**
   * @stable [23.04.2021]
   * @param connection
   */
  private isConnectionDied(connection: signalR.HubConnection): boolean {
    return !!Reflect.get(connection, SignalRChannel.$$CONNECTION_DIED);
  }

  /**
   * @stable [24.04.2021]
   * @param method
   * @param ip
   * @param uuid
   * @param message
   */
  private getMessage(method: string, ip: string, uuid: string, message?: string,): string {
    return `[$SignalRChannel][${method}] ${message ? `${message}.` : '[...]'} Ip: ${ip}. Client uuid: ${uuid}`;
  }

  /**
   * @stable [24.04.2021]
   * @param method
   * @param ip
   * @param uuid
   * @param message
   */
  private getMessageError(method: string, ip: string, uuid: string, message?: string): string {
    return `${this.getMessage(method, ip, uuid, message)}. Error:`;
  }
}
