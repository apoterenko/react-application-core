import * as signalR from '@microsoft/signalr';
import { injectable } from 'inversify';
import {
  ILogger,
  LoggerFactory,
} from 'ts-smart-logger';

import { BaseChannel } from '../base-channel.service';
import { TypeUtils } from '../../util';
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
      .withAutomaticReconnect()
      .build();

    let disconnectCallback;

    this.registerClient(ip, {
      on: async (event: string, callback: (...args: unknown[]) => void): Promise<void> => {
        switch (event) {
          case this.eventToListen:
            connection.on(event, callback);
            break;
          case CHANNEL_CONNECT_EVENT:
            await connection.start();
            callback();
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
        await connection.stop();

        if (TypeUtils.isFn(disconnectCallback)) {
          disconnectCallback();
        }
      },
    });
  }
}
