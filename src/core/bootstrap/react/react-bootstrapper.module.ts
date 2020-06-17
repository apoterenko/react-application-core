import {
  DI_TYPES,
  DiSupport,
} from '../../di';
import { ReactBootstrapper } from './react-bootstrapper.service';

/**
 * @stable [17.06.2020]
 */
DiSupport.bindInSingleton(DI_TYPES.ReactBootstrapper, ReactBootstrapper);
