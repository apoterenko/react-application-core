import { History } from 'history';

import { BaseContainerT } from 'core/component/base';
import { IContainerWrapperCtor } from 'core/component/application';
import { IRootContainerAttributes } from 'core/component/root';
import { IConnectorConfig, ConnectorConfigT } from 'core/component/store';
import { IApplicationState } from 'core/store';
import { IApplicationAccessConfig, IApplicationPermissionsState } from 'core/permission';
import { IApplicationDictionariesState } from 'core/dictionary';

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

export interface IRouteComponentConfig extends IRootContainerAttributes {
  type: ContainerVisibilityTypeEnum;
}

export type RouteContainerT = BaseContainerT|IContainerWrapperCtor;
export const DYNAMIC_ROUTES = new Map<RouteContainerT, ConnectorConfigT>();

export const ROUTER_NAVIGATE_ACTION_TYPE = 'router.navigate';
export const ROUTER_BACK = 'back';
export const ROUTER_NAVIGATE_BACK_ACTION_TYPE = `${ROUTER_NAVIGATE_ACTION_TYPE}.${ROUTER_BACK}`;
