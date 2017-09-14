import { History } from 'history';

export interface IRouters {
  profile: string;
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

export const ROUTER_NAVIGATE_ACTION_TYPE = 'router.navigate';
export const ROUTER_BACK_ACTION_TYPE = 'router.back';
