import { appContainer, DI_TYPES } from '../../di';

import {
  IApplicationModifyEntityPayloadFactory,
} from './modify-entity-payload-factory.interface';
import { ModifyEntityPayloadFactory } from './modify-entity-payload.factory';

appContainer.bind<IApplicationModifyEntityPayloadFactory>(DI_TYPES.ModifyEntityPayloadFactory)
    .to(ModifyEntityPayloadFactory).inSingletonScope();
