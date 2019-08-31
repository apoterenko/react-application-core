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
export enum EventTouchEventsEnum {
  TOUCH_START = 'touchstart',
  TOUCH_END = 'touchend',
  TOUCH_CANCEL = 'touchcancel',
  TOUCH_MOVE = 'touchmove',
}
