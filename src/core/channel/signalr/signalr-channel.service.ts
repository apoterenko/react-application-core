import * as signalR from '@microsoft/signalr';
import { injectable } from 'inversify';
import {
  ILogger,
  LoggerFactory,
} from 'ts-smart-logger';

import { BaseChannel } from '../base-channel.service';
import {
  ArrayUtils,
  ConditionUtils,
  DelayedTask,
  TypeUtils,
} from '../../util';
import {
  CHANNEL_CONNECT_EVENT,
  CHANNEL_DISCONNECT_EVENT,
} from '../../definition';
import { ISignalRChannelConfigEntity } from './signalr-channel.interface';

/**
 * @service
 * @stable [04.11.2020]
 */
@injectable()
export class SignalRChannel extends BaseChannel<ISignalRChannelConfigEntity> {
  protected static readonly logger = LoggerFactory.makeLogger('SignalRChannel');

  private static readonly $$CONNECTION_STOPPED = '$$connectionStopped';
  private static readonly $$RECONNECT_TASK = '$$reconnectTask';
  private static readonly RETRY_DELAYS = ArrayUtils
    .makeArray(500)
    .map((_, index) => Math.round(index * 1.2 * 1000))
    .concat(null);

  /**
   * @stable [04.11.2020]
   */
  constructor() {
    super();

    this.onMessage = this.onMessage.bind(this);
  }

  /**
   * @stable [04.11.2020]
   * @param ip
   * @param config
   */
  public connect(ip: string, config?: ISignalRChannelConfigEntity): void {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(ip)
      .withAutomaticReconnect(SignalRChannel.RETRY_DELAYS)
      .build();

    let disconnectCallback;

    this.registerClient(ip, {
      on: async (event: string, callback: (...args: unknown[]) => void): Promise<void> => {
        switch (event) {
          case this.eventToListen:
            connection.on(event, callback);
            break;
          case CHANNEL_CONNECT_EVENT:
            connection.onreconnecting(() => {
              // The server is down
              SignalRChannel.logger.info('[$SignalRChannel][connect][onreconnecting]');

              if (TypeUtils.isFn(disconnectCallback)) {
                disconnectCallback();
              }
            });

            connection.onreconnected(() => {
              SignalRChannel.logger.info('[$SignalRChannel][connect][onreconnected]');
              callback();
            });

            await this.doConnect(connection, callback);
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
        this.stopReconnectTask(connection);
        this.setStopConnection(connection);

        try {
          await connection.stop();
        } catch (e) {
          SignalRChannel.logger.error('[$SignalRChannel][close] Error:', e);
        }

        if (TypeUtils.isFn(disconnectCallback)) {
          disconnectCallback();
        }
      },
    });
  }

  /**
   * @stable [06.11.2020]
   * @param connection
   * @param callback
   * @private
   */
  private async doConnect(connection: signalR.HubConnection, callback: (...args: unknown[]) => void): Promise<void> {
    try {
      await connection.start();
      callback();

      this.stopReconnectTask(connection);
    } catch (e) {
      SignalRChannel.logger.error('[$SignalRChannel][connect] Error:', e);

      if (!this.isConnectionStopped(connection)) {
        this.tryReconnect(connection, callback);
      }
    }
  }

  /**
   * @stable [06.11.2020]
   * @private
   */
  private tryReconnect(connection: signalR.HubConnection, callback: (...args: unknown[]) => void): void {
    SignalRChannel.logger.debug('[$SignalRChannel][tryReconnect] Connection:', connection);

    let reconnectTask = this.getReconnectTask(connection);

    ConditionUtils.ifNilThanValue(
      reconnectTask,
      () => {
        this.setReconnectTask(
          connection,
          reconnectTask = new DelayedTask(
            async () => {
              if (!this.isConnectionStopped(connection)) {
                SignalRChannel.logger.debug('[$SignalRChannel][tryReconnect] Task. Connection:', connection);
                await this.doConnect(connection, callback);
              }
            },
            2000
          )
        );
      }
    );
    reconnectTask.start();
  }

  /**
   * @stable [07.11.2020]
   * @param connection
   * @private
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
   * @stable [06.11.2020]
   * @param connection
   * @private
   */
  private getReconnectTask(connection: signalR.HubConnection): DelayedTask {
    return Reflect.get(connection, SignalRChannel.$$RECONNECT_TASK);
  }

  /**
   * @stable [07.11.2020]
   * @param connection
   * @param task
   * @private
   */
  private setReconnectTask(connection: signalR.HubConnection, task: DelayedTask): void {
    Reflect.set(connection, SignalRChannel.$$RECONNECT_TASK, task);
  }

  /**
   * @stable [07.11.2020]
   * @param connection
   * @private
   */
  private setStopConnection(connection: signalR.HubConnection): void {
    Reflect.set(connection, SignalRChannel.$$RECONNECT_TASK, true);
  }

  /**
   * @stable [07.11.2020]
   * @param connection
   * @private
   */
  private isConnectionStopped(connection: signalR.HubConnection): boolean {
    return !!Reflect.get(connection, SignalRChannel.$$CONNECTION_STOPPED);
  }
}
