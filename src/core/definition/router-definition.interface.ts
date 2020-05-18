import { History } from 'history';

import {
  ACTION_PREFIX,
  IAccessDeniedWrapper,
  IAfterEnterWrapper,
  IBeforeEnterWrapper,
  IComputedMatchWrapper,
  IDepthWrapper,
  IExactWrapper,
  IHistoryWrapper,
  IHomeWrapper,
  IKeyWrapper,
  ILogoutWrapper,
  IOnEnterWrapper,
  IParamsWrapper,
  IPathWrapper,
  IProfileWrapper,
  ISignInWrapper,
  IStateWrapper,
  ITypeWrapper,
  IUrlWrapper,
} from '../definitions.interface';
import { IUniversalContainerCtor } from './container-definition.interface';
import { IConnectorEntity } from './connector-definition.interface';

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
  extends IAccessDeniedWrapper<string>,
    IHomeWrapper<string>,
    ILogoutWrapper,
    IProfileWrapper<string>,
    ISignInWrapper<string> {
}

/**
 * @flux-entity
 * @stable [18.05.2020]
 */
export interface IFluxNavigateEntity<TPath = string, TState = {}>
  extends IDepthWrapper,
    IPathWrapper<TPath>,
    IStateWrapper<TState> {
}

/**
 * @stable [16.11.2019]
 */
export interface IRouteComputedMatchEntity
  extends IParamsWrapper,
    IUrlWrapper,
    IPathWrapper {
}

/**
 * @stable [16.11.2019]
 */
export enum ContainerVisibilityTypesEnum {
  PUBLIC,
  PRIVATE,
}

/**
 * @stable [16.11.2019]
 */
export interface IRouteEntity
  extends IAfterEnterWrapper<() => void>,
    IBeforeEnterWrapper<() => void>,
    IComputedMatchWrapper<IRouteComputedMatchEntity>,
    IExactWrapper,
    IKeyWrapper,
    IOnEnterWrapper<() => void>,
    IPathWrapper<string | (() => string)>,
    ITypeWrapper<ContainerVisibilityTypesEnum> {
}

/**
 * @stable [16.11.2019]
 */
export type RoutePredicateT = (entity: IRouteEntity) => boolean;

/**
 * @stable [16.11.2019]
 */
export type DynamicRoutesMapT = Map<IUniversalContainerCtor, IConnectorEntity>;

/**
 * @stable [09.10.2019]
 */
export const $RAC_ROUTER_NAVIGATE_ACTION_TYPE = `${ACTION_PREFIX}router.navigate`;
export const $RAC_ROUTER_NAVIGATE_BACK_ACTION_TYPE = `${ACTION_PREFIX}router.navigate.back`;
export const $RAC_ROUTER_RELOAD_ACTION_TYPE = `${$RAC_ROUTER_NAVIGATE_ACTION_TYPE}.reload`;
export const $RAC_ROUTER_REPLACE_ACTION_TYPE = `${ACTION_PREFIX}router.replace`;
export const $RAC_ROUTER_REWRITE_ACTION_TYPE = `${ACTION_PREFIX}router.rewrite`;
