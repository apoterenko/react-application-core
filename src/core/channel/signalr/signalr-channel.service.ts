import * as $ from 'jquery';
import * as R from 'ramda';
window.jQuery = $;  // Needed to signalr
import 'signalr';
import * as Promise from 'bluebird';
import { injectable } from 'inversify';
import { LoggerFactory, ILogger } from 'ts-smart-logger';

import { AnyT, UNDEF, IKeyValue } from '../../definitions.interface';
import { BaseChannel } from '../base-channel.service';
import { createScript, isFn, toType } from '../../util';
import {
  CHANNEL_CONNECT_EVENT,
  CHANNEL_DISCONNECT_EVENT,
  CHANNEL_SEND_EVENT,
} from '../channel.interface';
import { ISignalRChannelConfig } from './signalr-channel.interface';

@injectable()
export class SignalRChannel extends BaseChannel<ISignalRChannelConfig> {
  protected static logger = LoggerFactory.makeLogger('SignalRChannel');

  private signalRScriptTask: Promise<HTMLScriptElement>;
  private signalRInitTasks = new Map<string, Promise<void>>();

  /**
   * @stable [12.12.2018]
   */
  constructor() {
    super();
    this.onMessage = this.onMessage.bind(this);
  }

  /**
   * @stable [21.05.2018]
   * @param {string} ip
   * @param {ISignalRChannelConfig} config
   */
  public connect(ip: string, config?: ISignalRChannelConfig): void {
    const hubUrl = `${this.settings.signalRUrl}${ip}`;

    // We need to load the script at the any case
    this.signalRScriptTask = this.signalRScriptTask || createScript({src: hubUrl});

    this.cancelInitTask(ip);
    this.signalRInitTasks.set(
      ip,
      // Need to wrap the script loader promise because of chain cancellation
      new Promise((resolve) => this.signalRScriptTask.then(resolve)) // This new promise instance may be canceled!
        .then(() => this.onSignalRInitialize(ip, hubUrl, config))
    );
  }

  /**
   * @stable [11.12.2018]
   * @param {string} ip
   */
  public disconnect(ip: string): void {
    this.cancelInitTask(ip);
    this.unregisterClient(ip);
  }

  /**
   * @stable [12.12.2018]
   * @param {string} ip
   * @param {string} hubUrl
   * @param {ISignalRChannelConfig} config
   */
  private onSignalRInitialize(ip: string, hubUrl: string, config?: ISignalRChannelConfig): void {
    const onMessage = this.onMessage;
    const specificChannel = Reflect.get($.connection, !R.isNil(config) && config.channel);
    const isSpecificChannelPresent = !R.isNil(specificChannel);

    $.connection.hub.url = hubUrl;
    if (!R.isNil(config) && isFn(config.query)) {
      $.connection.hub.qs = toType<() => IKeyValue>(config.query)();
    }
    Reflect.set($.connection.hub, 'baseUrl', this.settings.signalRUrl);

    let disconnectCallback;
    let isDisconnected = false;

    this.registerClient(ip, {
        on(event: string, callback: (...args: AnyT[]) => void): void {
          switch (event) {
            case CHANNEL_CONNECT_EVENT:
              if (isSpecificChannelPresent) {
                specificChannel.client.addMessage = () => {
                  // Do nothing. This is needed to receive the messages via "hub.received"
                };
              }
              $.connection.hub.start().done(() => {
                if (!isDisconnected) {
                  callback();
                  $.connection.hub.received((data) => onMessage(ip, UNDEF, data));
                }
              });
              break;
            case CHANNEL_DISCONNECT_EVENT:
              disconnectCallback = () => {
                isDisconnected = true;
                callback();
              };
              break;
          }
        },
        emit(event: string, ...args: AnyT[]): void {
          switch (event) {
            case CHANNEL_SEND_EVENT:
              try {
                if (isSpecificChannelPresent) {
                  specificChannel.server.sendMessage(...args);
                } else {
                  $.connection.hub.send(args[0]);
                }
              } catch (e) {
                SignalRChannel.logger.error(
                  `[$SignalRChannel][onSignalRInitialize] An error occurred during send a message! The hub: ${ip}.`, e
                );
              }
              break;
          }
        },
        close(): void {
          if (isFn(disconnectCallback)) {
            disconnectCallback();
          }
          $.connection.hub.stop(false);
        },
      }
    );
  }

  /**
   * @stable [11.12.2018]
   * @param {string} ip
   */
  private cancelInitTask(ip: string): void {
    if (this.signalRInitTasks.has(ip)) {
      this.signalRInitTasks.get(ip).cancel();
      this.signalRInitTasks.delete(ip);
    }
  }
}
