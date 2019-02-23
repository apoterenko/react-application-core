import * as crossvent from 'crossvent';
import { injectable } from 'inversify';

import { IEventManager } from './event-manager.interface';
import { AnyT } from '../definitions.interface';

@injectable()
export class EventManager implements IEventManager {

  /**
   * @stable [23.02.2019]
   * @param {EventTarget} el
   * @param {string} type
   * @param {(...args) => AnyT} callback
   * @param {boolean} capturing
   * @returns {() => void}
   */
  public subscribe(el: EventTarget, type: string, callback: (...args) => void, capturing?: boolean): () => void {
    this.add(el, type, callback, capturing);
    return () => this.remove(el, type, callback, capturing);
  }

  /**
   * @stable [23.02.2019]
   * @param {EventTarget} el
   * @param {string} type
   * @param {(...args) => void} callback
   * @param {boolean} capturing
   */
  public add(el: EventTarget, type: string, callback: (...args) => void, capturing?: boolean): void {
    crossvent.add(el, type, callback, capturing);
  }

  /**
   * @stable [23.02.2019]
   * @param {EventTarget} el
   * @param {string} type
   * @param {(...args) => void} callback
   * @param {boolean} capturing
   */
  public remove(el: EventTarget, type: string, callback: (...args) => void, capturing?: boolean): void {
    crossvent.remove(el, type, callback, capturing);
  }

  /**
   * @stable [23.02.2019]
   * @param {EventTarget} el
   * @param {string} type
   * @param {(...args) => void} callback
   * @param {AnyT} model
   */
  public fabricate(el: EventTarget, type: string, callback: (...args) => void, model?: AnyT): void {
    crossvent.fabricate(el, type, callback, model);
  }
}
