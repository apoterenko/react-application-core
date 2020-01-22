import {
  bindInSingleton,
  DI_TYPES,
} from '../di';
import { Environment } from './env.service';

/**
 * @stable [11.09.2019]
 */
bindInSingleton(DI_TYPES.Environment, Environment);
