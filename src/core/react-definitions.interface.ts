import { IBaseEvent } from './definition';

/**
 * @deprecated
 * TODO
 */
export interface IReactOnClickWrapper<TPayload = IBaseEvent, TOnClick = (payload?: TPayload) => void> {
  onClick?: TOnClick;
}

/**
 * @deprecated
 * TODO
 */
export interface IOnNavigationActionClickWrapper<TPayload = IBaseEvent,
                                                 TOnNavigationActionClick = (payload?: TPayload) => void> {
  onNavigationActionClick?: TOnNavigationActionClick;
}
