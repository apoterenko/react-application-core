import {
  bindInSingleton,
  DI_TYPES,
} from '../../../../di';
import { UiIconFactory } from './ui-icon-factory.service';

/**
 * @stable [19.04.2020]
 */
bindInSingleton(DI_TYPES.UiIconFactory, UiIconFactory);
bindInSingleton(UiIconFactory);
