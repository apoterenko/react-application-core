import { DI_TYPES, bindInSingleton } from '../di';
import { IEnvironment } from '../definition';
import { Environment } from './env.service';

/**
 * @stable [11.09.2019]
 */
bindInSingleton<IEnvironment>(DI_TYPES.Environment, Environment);
