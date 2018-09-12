import * as Promise from 'bluebird';

import { ENV } from '../env';

/**
 * @stable [27.05.2018]
 */
Promise.config({
  warnings: true,
  longStackTraces: true,
  cancellation: true,
  monitoring: !ENV.prodMode,
});
