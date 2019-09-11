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
  MOUSE_DOWN = 'mousedown',
}
