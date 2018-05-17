import { ACTION_PREFIX } from '../definitions.interface';
import { IDefaultConnectorConfiguration } from '../configurations-definitions.interface';
import { IContainerClassEntity } from '../entities-definitions.interface';
import { IContainerProps } from '../props-definitions.interface';

/* @stable - 15.04.2018 */
export const DYNAMIC_ROUTES = new Map<IContainerClassEntity, IDefaultConnectorConfiguration>();

/* @stable - 15.04.2018 */
export const ROUTER_NAVIGATE_ACTION_TYPE = `${ACTION_PREFIX}router.navigate`;
export const ROUTER_REPLACE_ACTION_TYPE = `${ACTION_PREFIX}router.replace`;
export const ROUTER_BACK_ACTION_TYPE = `${ROUTER_NAVIGATE_ACTION_TYPE}.back`;
