import * as React from 'react';

/**
 * @stable [11.11.2018]
 */
export interface IBasicEvent<TElement = {}> extends React.SyntheticEvent<TElement> {
}

/**
 * @stable [11.11.2018]
 */
export interface IReactOnClickWrapper<TPayload = IBasicEvent, TOnClick = (payload?: TPayload) => void> {
  onClick?: TOnClick;
}

/**
 * @stable [11.11.2018]
 */
export interface IOnColumnClickWrapper<TPayload = IBasicEvent, TOnColumnClick = (payload?: TPayload) => void> {
  onColumnClick?: TOnColumnClick;
}

/**
 * @stable [11.11.2018]
 */
export interface IOnEmptyMessageClickWrapper<TPayload = IBasicEvent, TOnClick = (payload?: TPayload) => void> {
  onEmptyMessageClick?: TOnClick;
}

/**
 * @stable [11.11.2018]
 */
export interface IOnNavigationActionClickWrapper<TPayload = IBasicEvent,
                                                 TOnNavigationActionClick = (payload?: TPayload) => void> {
  onNavigationActionClick?: TOnNavigationActionClick;
}

/**
 * @stable [11.11.2018]
 */
export interface IOnActionClickWrapper<TPayload = IBasicEvent, TOnActionClick = (payload?: TPayload) => void> {
  onActionClick?: TOnActionClick;
}
