import { History } from 'history';

import {
  ACTION_PREFIX,
  IHistoryWrapper,
  IHomeWrapper,
  ILogoutWrapper,
  IPathWrapper,
  IProfileWrapper,
  ISignInWrapper,
  IStateWrapper,
} from '../definitions.interface';

/**
 * @stable [24.09.2019]
 */
export interface IRouter
  extends History {
}

/**
 * @stable [24.09.2019]
 */
export interface IRouterWrapperEntity
  extends IHistoryWrapper<IRouter> {
}

/**
 * @stable [26.09.2019]
 */
export interface IRoutesEntity
  extends IHomeWrapper<string>,
    IProfileWrapper<string>,
    ILogoutWrapper<string>,
    ISignInWrapper<string> {
}

/**
 * @stable [09.10.2019]
 */
export interface INavigateEntity<TPath, TState = {}>
  extends IPathWrapper<TPath>,
    IStateWrapper<TState> {
}

/**
 * @stable [09.10.2019]
 */
export const ROUTER_NAVIGATE_ACTION_TYPE = `${ACTION_PREFIX}router.navigate`;
export const ROUTER_REPLACE_ACTION_TYPE = `${ACTION_PREFIX}router.replace`;
export const ROUTER_REWRITE_ACTION_TYPE = `${ACTION_PREFIX}router.rewrite`;
export const ROUTER_BACK_ACTION_TYPE = `${ROUTER_NAVIGATE_ACTION_TYPE}.back`;
