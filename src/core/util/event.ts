import * as R from 'ramda';

import { IBaseEvent } from '../definition';

/**
 * @stable [30.08.2019]
 * @param {IBaseEvent} event
 * @param {boolean} passiveEvent
 */
export const cancelEvent = <TEvent extends IBaseEvent>(event: TEvent,
                                                       passiveEvent = false): void => {
  if (R.isNil(event)) {
    return;
  }
  if (event.nativeEvent) {
    /**
     * If several listeners are attached to the same element for the same event type, they are called in the order
     * in which they were added. If stopImmediatePropagation() is invoked during one such call, no remaining
     * listeners will be called
     */
    event.nativeEvent.stopImmediatePropagation();
  }
  if (passiveEvent === false) {
    /**
     * A Boolean which, if true, indicates that the function specified by listener will never call preventDefault().
     * If a passive listener does call preventDefault(), the user agent will do nothing other than generate a console
     * warning. See Improving scrolling performance with passive listeners to learn more.
     *
     * According to the specification, the default value for the passive option is always false. However, this introduces
     * the potential for event listeners handling certain touch events (among others) to block the browser's main thread
     * while it is attempting to handle scrolling, resulting in possibly enormous reduction in performance during
     * scroll handling.
     * To prevent this problem, some browsers (specifically, Chrome and Firefox) have changed the default value of the
     * passive option to true for the touchstart and touchmove events on the document-level nodes Window, Document,
     * and Document.body. This prevents the event listener from being called, so it can't block page rendering while
     * the user is scrolling.
     */
    event.preventDefault();
  }
  event.stopPropagation();
};

/**
 * @stable [14.10.2020]
 */
export class EventUtils {
  public static readonly cancelEvent = cancelEvent;
}
