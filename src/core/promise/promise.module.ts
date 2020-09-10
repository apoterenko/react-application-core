import * as Promise from 'bluebird';

import { DefaultEntities } from '../definition';

/**
 * @stable [10.09.2020]
 */
Promise.config({
  cancellation: true,
  longStackTraces: true,
  monitoring: !DefaultEntities.ENVIRONMENT_ENTITY.prodMode,
  warnings: true,
});
