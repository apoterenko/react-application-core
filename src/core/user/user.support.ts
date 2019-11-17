import { makeEntityActionBuilderFactory } from '../store/store.support';
import { USER_REDUCER_FACTORY_CONFIG_ENTITY } from '../definition';

/**
 * @stable [13.11.2019]
 */
export const userActionBuilder = makeEntityActionBuilderFactory(USER_REDUCER_FACTORY_CONFIG_ENTITY);
