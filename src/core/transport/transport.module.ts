import { appContainer, DI_TYPES } from '../di';

import './transport.effects';
import { TransportFactory } from './transport.factory';
import { TransportService } from './transport.service';
import { TransportPayloadAnalyzer } from './transport-payload.analyzer';

appContainer.bind(DI_TYPES.TransportFactory).to(TransportFactory).inSingletonScope();
appContainer.bind(DI_TYPES.Transport).to(TransportService).inSingletonScope();
appContainer.bind(DI_TYPES.TransportPayloadAnalyzer).to(TransportPayloadAnalyzer).inSingletonScope();
