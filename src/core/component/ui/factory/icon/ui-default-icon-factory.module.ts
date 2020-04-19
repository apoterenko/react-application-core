import {
  bindInSingleton,
  DI_TYPES,
} from '../../../../di';
import { UiDefaultIconFactory } from './ui-default-icon-factory.service';

/**
 * @stable [19.04.2020]
 */
bindInSingleton(DI_TYPES.UiIconFactory, UiDefaultIconFactory);
