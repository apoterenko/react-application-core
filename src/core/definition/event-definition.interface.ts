import { AnyT } from '../definitions.interface';

/**
 * @stable [31.08.2019]
 */
export interface IBaseEvent
  extends Partial<Event> {
  nativeEvent?: Event;
}

/**
 * @stable [31.08.2019]
 */
export enum TouchEventsEnum {
  TOUCH_START = 'touchstart',
  TOUCH_END = 'touchend',
  TOUCH_CANCEL = 'touchcancel',
  TOUCH_MOVE = 'touchmove',
}

/**
 * @stable [11.09.2019]
 */
export enum EventsEnum {
  LOAD = 'load',
  MOUSE_DOWN = 'mousedown',
  UNLOAD = 'unload',
}

/**
 * @stable [24.09.2019]
 */
export interface IEventManager {
  add(el: EventTarget, type: string, callback: (...args) => void, capturing?: boolean): void;
  remove(el: EventTarget, type: string, callback: (...args) => void, capturing?: boolean): void;
  fabricate(el: EventTarget, type: string, callback: (...args) => void, model?: AnyT): void;
  subscribe(el: EventTarget, type: string, callback: (...args) => void, capturing?: boolean): () => void;
}
