import { IBaseEvent } from './definition';

/**
 * @deprecated
 * TODO
 */
export interface IReactOnClickWrapper<TPayload = IBaseEvent, TOnClick = (payload?: TPayload) => void> {
  onClick?: TOnClick;
}
