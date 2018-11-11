import { IBaseEvent } from '../definitions.interface';

/**
 * @stable [16.05.2018]
 * @param {IBaseEvent} event
 */
export const cancelEvent = (event: IBaseEvent) => {
  if (event.nativeEvent) {
    /**
     * Will prevent any parent handlers and also any other handlers from executing
     */
    event.nativeEvent.stopImmediatePropagation();
  }
  event.stopPropagation();
  event.preventDefault();
};
