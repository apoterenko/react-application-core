import { IDefaultConnectorConfiguration } from '../configurations-definitions.interface';
import { IComponentClassEntity } from '../entities-definitions.interface';

/* @stable - 15.04.2018 */
export const DYNAMIC_ROUTES = new Map<IComponentClassEntity, IDefaultConnectorConfiguration>();

/* @stable - 15.04.2018 */
export const ROUTER_NAVIGATE_ACTION_TYPE = 'router.navigate';
export const ROUTER_REPLACE_ACTION_TYPE = 'router.replace';
export const ROUTER_BACK_ACTION_TYPE = `${ROUTER_NAVIGATE_ACTION_TYPE}.back`;
