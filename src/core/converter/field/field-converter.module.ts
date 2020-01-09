import {
  bindInSingleton,
  DI_TYPES,
} from '../../di';
import { FieldConverter } from './field-converter.service';

/**
 * @stable [09.01.2020]
 */
bindInSingleton(DI_TYPES.FieldCoverter, FieldConverter);
bindInSingleton(FieldConverter);
