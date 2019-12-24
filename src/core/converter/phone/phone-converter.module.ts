import {
  bindInSingleton,
  DI_TYPES,
} from '../../di';
import { PhoneConverter } from './phone-converter.service';

/**
 * @stable [24.12.2019]
 */
bindInSingleton(DI_TYPES.PhoneConverter, PhoneConverter);
