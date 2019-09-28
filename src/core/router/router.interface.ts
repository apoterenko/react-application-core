import { ACTION_PREFIX } from '../definitions.interface';
import { IConnectorConfigEntity } from '../configurations-definitions.interface';
import { IUniversalContainerCtor } from '../entities-definitions.interface';
import { IUniversalContainerEntity, IContainerProps } from '../definition';

/* @stable - 15.04.2018 */
export const DYNAMIC_ROUTES = new Map<IUniversalContainerCtor, IConnectorConfigEntity>();

/* @stable - 15.04.2018 */
export const ROUTER_REWRITE_ACTION_TYPE = `${ACTION_PREFIX}router.rewrite`;
export const ROUTER_NAVIGATE_ACTION_TYPE = `${ACTION_PREFIX}router.navigate`;
export const ROUTER_REPLACE_ACTION_TYPE = `${ACTION_PREFIX}router.replace`;
export const ROUTER_BACK_ACTION_TYPE = `${ROUTER_NAVIGATE_ACTION_TYPE}.back`;
