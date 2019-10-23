import { bindInSingleton, DI_TYPES } from '../../di';
import { DomAccessor } from './dom-accessor.service';

/**
 * @stable [22.10.2019]
 */
bindInSingleton(DI_TYPES.DomAccessor, DomAccessor);
