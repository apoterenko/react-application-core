import { History } from 'history';

import { IBaseContainer, BaseContainerT } from 'core/component/base';

export interface IRouters {
  profile: string;
  home: string;
  login: string;
  accessDenied: string;
}

export interface IRouter extends History {
  basename?: string;
}

export interface IRouterComputedMatch {
  params: any;
  path: string;
  url: string;
  isExact: boolean;
}

export enum ContainerVisibilityTypeEnum {
  PUBLIC,
  PRIVATE,
}

export interface IRouteComponentConfig {
  path: string;
  type: ContainerVisibilityTypeEnum;
}

export const dynamicRoutesMap = new Map<BaseContainerT, IRouteComponentConfig>();

export const ROUTER_NAVIGATE_ACTION_TYPE = 'router.navigate';
export const ROUTER_BACK_ACTION_TYPE = 'router.back';
