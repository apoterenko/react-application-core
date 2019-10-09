import { bindInSingleton, DI_TYPES } from '../../di';

import { ModifyEntityPayloadFactory } from './modify-entity-payload.factory';

/**
 * @stable [09.10.2019]
 */
bindInSingleton(DI_TYPES.ModifyEntityPayloadFactory, ModifyEntityPayloadFactory);
