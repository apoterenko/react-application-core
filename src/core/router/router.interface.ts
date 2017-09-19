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

export const PUBLIC_COMPONENT_TYPE = 'public';
export const PRIVATE_COMPONENT_TYPE = 'private';

export interface IRouteComponentConfig {
  path: string;
  type: 'private' | 'public';
}

export const dynamicRoutesMap = new Map<BaseContainerT, IRouteComponentConfig>();

export const ROUTER_NAVIGATE_ACTION_TYPE = 'router.navigate';
export const ROUTER_BACK_ACTION_TYPE = 'router.back';
