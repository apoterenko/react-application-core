import * as Promise from 'bluebird';

import { PROD_MODE } from '../env';

/**
 * @stable [27.05.2018]
 */
Promise.config({
  warnings: true,
  longStackTraces: true,
  cancellation: true,
  monitoring: !PROD_MODE,
});
