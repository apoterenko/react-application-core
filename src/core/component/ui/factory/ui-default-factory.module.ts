import { bindInSingleton, DI_TYPES } from '../../../di';
import { UIDefaultFactory } from './ui-default-factory.service';

/**
 * @stable [30.09.2019]
 */
bindInSingleton(DI_TYPES.UIDefaultFactory, UIDefaultFactory);
