import { IBaseEvent } from './definition';

/**
 * @stable [11.11.2018]
 */
export interface IReactOnClickWrapper<TPayload = IBaseEvent, TOnClick = (payload?: TPayload) => void> {
  onClick?: TOnClick;
}

/**
 * @stable [11.11.2018]
 */
export interface IOnColumnClickWrapper<TPayload = IBaseEvent, TOnColumnClick = (payload?: TPayload) => void> {
  onColumnClick?: TOnColumnClick;
}

/**
 * @stable [11.11.2018]
 */
export interface IOnNavigationActionClickWrapper<TPayload = IBaseEvent,
                                                 TOnNavigationActionClick = (payload?: TPayload) => void> {
  onNavigationActionClick?: TOnNavigationActionClick;
}

/**
 * @stable [11.11.2018]
 */
export interface IOnActionClickWrapper<TPayload = IBaseEvent, TOnActionClick = (payload?: TPayload) => void> {
  onActionClick?: TOnActionClick;
}
