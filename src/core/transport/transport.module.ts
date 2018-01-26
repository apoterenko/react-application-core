import { appContainer, DI_TYPES } from '../di';

import './transport.effects';
import { TransportFactory } from './transport.factory';
import { TransportService } from './transport.service';
import { TransportPayloadAnalyzer } from './transport-payload.analyzer';
import { TransportErrorInterceptor } from './transport-error.interceptor';
import { TransportRequestFactory } from './transport-request.factory';

appContainer.bind(DI_TYPES.TransportRequestFactory).to(TransportRequestFactory).inSingletonScope();
appContainer.bind(DI_TYPES.TransportFactory).to(TransportFactory).inSingletonScope();
appContainer.bind(DI_TYPES.Transport).to(TransportService).inSingletonScope();
appContainer.bind(DI_TYPES.TransportPayloadAnalyzer).to(TransportPayloadAnalyzer).inSingletonScope();
appContainer.bind(DI_TYPES.TransportErrorInterceptor).to(TransportErrorInterceptor).inSingletonScope();
