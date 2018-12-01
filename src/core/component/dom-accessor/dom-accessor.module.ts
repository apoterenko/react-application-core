import { appContainer, DI_TYPES } from '../../di';

import { DomAccessor } from './dom-accessor.service';

appContainer.bind(DI_TYPES.DomAccessor).to(DomAccessor).inSingletonScope();
