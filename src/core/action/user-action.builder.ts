import { ActionUtils } from '../util';

import {
  $RAC_USER_REDUCER_FACTORY_CONFIG_ENTITY,
} from '../definition';

/**
 * @stable [14.03.2020]
 */
export const userActionBuilder = ActionUtils.entityActionBuilderFactory($RAC_USER_REDUCER_FACTORY_CONFIG_ENTITY);
