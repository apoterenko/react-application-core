import { History } from 'history';

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
