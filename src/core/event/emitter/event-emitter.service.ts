import * as eventEmitter from 'event-emitter';
import { injectable } from 'inversify';

import {
  IEventEmitter,
  IEventEmitterSubscribeEntity,
} from '../../definition';
import { AnyT } from '../../definitions.interface';

@injectable()
export class EventEmitter implements IEventEmitter {

  private emitter;

  /**
   * @stable [17.01.2020]
   */
  constructor() {
    this.emitter = eventEmitter();
  }

  /**
   * @stable [17.01.2020]
   * @param {IEventEmitterSubscribeEntity} cfg
   * @returns {() => void}
   */
  public subscribe(cfg: IEventEmitterSubscribeEntity): () => void {
    const {
      autoUnsubscribing,
      callback,
      condition = (...args) => true,
      eventName,
    } = cfg;

    let listener;
    const eventUnsubscriber = () => this.emitter.off(eventName, listener);

    listener = (...args) => {
      if (condition(...args)) {
        if (autoUnsubscribing) {
          eventUnsubscriber();
        }
        callback();
      }
    };

    this.emitter.on(eventName, listener);
    return eventUnsubscriber;
  }

  /**
   * @stable [17.01.2020]
   * @param {string} event
   * @param {AnyT[]} args
   */
  public emit(event: string, ...args: AnyT[]): void {
    this.emitter.emit(event, ...args);
  }
}
