import { makeEntityActionBuilderFactory } from '../store/store.support';
import {
  IEntityActionBuilder,
  $RAC_USER_REDUCER_FACTORY_CONFIG_ENTITY,
} from '../definition';

/**
 * @stable [13.11.2019]
 */
export const userActionBuilder = makeEntityActionBuilderFactory($RAC_USER_REDUCER_FACTORY_CONFIG_ENTITY);
