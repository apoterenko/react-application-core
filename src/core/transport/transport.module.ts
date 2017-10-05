import { appContainer, DI_TYPES } from '../di';

import { TransportFactory } from './transport.factory';
import { TransportService } from './transport.service';

appContainer.bind(DI_TYPES.TransportFactory).to(TransportFactory).inSingletonScope();
appContainer.bind(DI_TYPES.Transport).to(TransportService).inSingletonScope();
