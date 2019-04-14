import * as $ from 'jquery';
import * as R from 'ramda';
window.jQuery = $;  // Needed to signalr
import 'signalr';
import * as Promise from 'bluebird';
import { injectable } from 'inversify';
import { LoggerFactory, ILogger } from 'ts-smart-logger';

import { AnyT, UNDEF, IKeyValue } from '../../definitions.interface';
import { BaseChannel } from '../base-channel.service';
import { createScript, isFn, toType, isArrayNotEmpty } from '../../util';
import {
  CHANNEL_CONNECT_EVENT,
  CHANNEL_DISCONNECT_EVENT,
  CHANNEL_SEND_EVENT,
} from '../channel.interface';
import {
  ISignalRChannelConfigEntity,
  ISignalRChannelMessageEntity,
  SignalRChannelMessageEntityT,
} from './signalr-channel.interface';

@injectable()
export class SignalRChannel extends BaseChannel<ISignalRChannelConfigEntity, SignalRChannelMessageEntityT> {
  protected static logger = LoggerFactory.makeLogger('SignalRChannel');

  private signalRScriptTask: Promise<HTMLScriptElement>;
  private readonly signalRInitTasks = new Map<string, Promise<void>>();

  /**
   * @stable [12.12.2018]
   */
  constructor() {
    super();
    this.onMessage = this.onMessage.bind(this);
    this.toChannelClient = this.toChannelClient.bind(this);
  }

  /**
   * @stable [21.05.2018]
   * @param {string} ip
   * @param {ISignalRChannelConfigEntity} config
   */
  public connect(ip: string, config?: ISignalRChannelConfigEntity): void {
    const hubUrl = `${this.settings.signalRUrl}${ip}`;

    // We need to load the script at the any case
    this.signalRScriptTask = this.signalRScriptTask || createScript({src: `${hubUrl}?_dc=${Date.now()}`});

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
   * @param {ISignalRChannelConfigEntity} config
   */
  private onSignalRInitialize(ip: string, hubUrl: string, config?: ISignalRChannelConfigEntity): void {
    const onMessage = this.onMessage;
    const toChannelClient = this.toChannelClient;
    const areSpecificChannelsPresent = !R.isNil(config) && isArrayNotEmpty(config.channels);

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
              if (areSpecificChannelsPresent) {
                config.channels.forEach((channel) => {
                  const specificChannel = toChannelClient(channel, CHANNEL_CONNECT_EVENT);
                  if (!R.isNil(specificChannel)) {
                    specificChannel.on('addmessage', () => { /* Don't remove!. This is a stub for SignalR */ });
                  }
                });
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
        emit(event: string, ...args: SignalRChannelMessageEntityT[]): void {
          switch (event) {
            case CHANNEL_SEND_EVENT:
              try {
                if (areSpecificChannelsPresent) {
                  const payload = toType<ISignalRChannelMessageEntity>(args[0]);
                  if (R.isNil(payload.channel)) {
                    SignalRChannel.logger.warn(
                      `[$SignalRChannel][onSignalRInitialize][${CHANNEL_SEND_EVENT
                        }] A specific channel name is not defined. The params:`, JSON.stringify(args)
                    );
                  } else {
                    const specificChannel = toChannelClient(payload.channel, CHANNEL_SEND_EVENT);
                    if (!R.isNil(specificChannel)) {
                      const dynamicMethods = Object.keys(specificChannel.server);
                      if (!dynamicMethods.length) {
                        SignalRChannel.logger.warn(
                          `[$SignalRChannel][onSignalRInitialize] There are no dynamic methods to execute! The hub: ${ip}.`
                        );
                      } else {
                        if (dynamicMethods.length === 1) {
                          SignalRChannel.logger.debug(
                            `[$SignalRChannel][onSignalRInitialize] The dynamic methods to execute are ${
                              JSON.stringify(dynamicMethods)}! The hub: ${ip}.`
                          );

                          specificChannel.server[dynamicMethods[0]](...payload.params);
                        } else {
                          SignalRChannel.logger.warn(
                            `[$SignalRChannel][onSignalRInitialize] There are more than one methods to execute! The hub: ${
                              ip}. The methods: ${JSON.stringify(dynamicMethods)}`
                          );
                        }
                      }
                    }
                  }
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
          // See for details https://github.com/SignalR/SignalR/blob/master/src/Microsoft.AspNet.SignalR.JS/jquery.signalR.core.js#L887
          $($.connection.hub).off('onReceived');

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

  /**
   * @stable [17.12.2018]
   * @param {string} channelName
   * @param {string} event
   * @returns {IKeyValue}
   */
  private toChannelClient(channelName: string, event: string): IKeyValue {
    const specificChannel = Reflect.get($.connection, channelName);
    if (R.isNil(specificChannel)) {
      SignalRChannel.logger.warn(
        `[$SignalRChannel][toChannelClient][${event}] A specific channel is not defined by channel name ${
          channelName || '[-]'}. The event:`, event
      );
    }
    return specificChannel;
  }
}
