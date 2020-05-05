import {
  bindToConstantValue,
  DI_TYPES,
} from '../di';
import { replaceByParameters } from '../util';

/**
 * @stable [28.01.2020]
 */
bindToConstantValue(DI_TYPES.Translate, replaceByParameters);
