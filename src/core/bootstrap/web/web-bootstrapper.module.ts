import { bindInSingleton, DI_TYPES } from '../../di';
import { WebBootstrapper } from './web-bootstrapper.service';

/**
 * @stable [01.10.2019]
 */
bindInSingleton(DI_TYPES.WebBootstrapper, WebBootstrapper);
