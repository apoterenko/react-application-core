import {
  bindInSingleton,
  DI_TYPES,
} from '../../../di';
import { UiFactory } from './ui-factory.service';

/**
 * @stable [30.09.2019]
 */
bindInSingleton(DI_TYPES.UiFactory, UiFactory);
