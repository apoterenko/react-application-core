import {
  DI_TYPES,
  DiSupport,
} from '../../di';
import { WebBootstrapper } from './web-bootstrapper.service';

/**
 * @stable [17.06.2020]
 */
DiSupport.bindInSingleton(DI_TYPES.WebBootstrapper, WebBootstrapper);
