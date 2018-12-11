import * as $ from 'jquery';
window.jQuery = $;  // Needed to signalr
import 'signalr';
import * as Promise from 'bluebird';
import { injectable } from 'inversify';
import { LoggerFactory, ILogger } from 'ts-smart-logger';

import { AnyT, UNDEF } from '../../definitions.interface';
import { BaseChannel } from '../base-channel.service';
import { createScript, isFn } from '../../util';
import {
  CHANNEL_CONNECT_EVENT,
  CHANNEL_DISCONNECT_EVENT,
  CHANNEL_SEND_EVENT,
} from '../channel.interface';

@injectable()
export class SignalRChannel extends BaseChannel {
  protected static logger = LoggerFactory.makeLogger('SignalRChannel');

  private signalRScriptTask: Promise<HTMLScriptElement>;
  private signalRInitTasks = new Map<string, Promise<void>>();

  /**
   * @stable [21.05.2018]
   * @param {string} ip
   * @param {AnyT} config
   */
  public connect(ip: string, config?: AnyT): void {
    const hubUrl = `${this.settings.signalRUrl}${ip}`;

    // We need to load the script at the any case
    this.signalRScriptTask = this.signalRScriptTask || createScript({src: hubUrl});

    this.cancelInitTask(ip);
    this.signalRInitTasks.set(
      ip,
      // Need to wrap the script loader promise because of chain cancellation
      new Promise((resolve) => this.signalRScriptTask.then(resolve)) // This new promise instance may be canceled!
        .then(() => this.onSignalRInitialize(ip, hubUrl))
    );
  }

  /**
   * @stable [11.12.2018]
   * @param {string} ip
   */
  public disconnect(ip: string): void {
    this.cancelInitTask(ip);
    this.unregisterClient(this.prepareIp(ip));
  }

  /**
   * @stable [11.12.2018]
   * @param {string} ip
   * @param {string} event0
   * @param {AnyT} messages
   */
  public emitEvent(ip: string, event0: string, ...messages: AnyT[]): void {
    super.emitEvent(this.prepareIp(ip), event0, ...messages);
  }

  /**
   * @stable [11.12.2018]
   * @param {string} ip
   * @param {AnyT} messages
   */
  public emitChannelEvent(ip: string, messages: AnyT): void {
    super.emitChannelEvent(this.prepareIp(ip), messages);
  }

  /**
   * @stable [11.12.2018]
   * @param {string} ip
   * @param {string} hubUrl
   */
  private onSignalRInitialize(ip: string, hubUrl: string): void {
    const hubName = this.prepareIp(ip);

    $.connection.hub.url = hubUrl;
    Reflect.set($.connection.hub, 'baseUrl', this.settings.signalRUrl);

    let disconnectCallback;
    let isDisconnected = false;

    this.registerClient(hubName, {
        on(event: string, callback: (...args: AnyT[]) => void): void {
          switch (event) {
            case CHANNEL_CONNECT_EVENT:
              $.connection.hub.start().done(() => {
                if (!isDisconnected) {
                  callback();
                  $.connection.hub.received((data) => this.onMessage(hubName, UNDEF, data));
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
                $.connection.hub.send(args[0]);
              } catch (e) {
                SignalRChannel.logger.error(
                  `[$SignalRChannel][onSignalRInitialize] An error occurred during send a message! The hub: ${hubName}.`, e
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
   * @returns {string}
   */
  private prepareIp(ip: string): string {
    return `signalr:${ip}`;
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
