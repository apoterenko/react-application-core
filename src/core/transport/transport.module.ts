import { appContainer, DI_TYPES, bindInSingleton } from '../di';
import { Transport } from './transport.service';
import { TransportPayloadAnalyzer } from './transport-payload.analyzer';
import { TransportErrorInterceptor } from './transport-error.interceptor';
import { TransportRequestProvider } from './request/provider/transport-request-provider.service';
import { TransportTokenAccessor } from './transport-token.accessor';
import { FetchJsonTransportFactory } from './fetch-json-transport.factory';
import './transport.effects';
import './factory/transport-factory.module';
import './request/transport-request.module';
import { TransportResponseFactory } from './response/transport-response-factory.service';

appContainer.bind(DI_TYPES.TransportTokenAccessor).to(TransportTokenAccessor).inSingletonScope();
appContainer.bind(DI_TYPES.TransportRequestProvider).to(TransportRequestProvider).inSingletonScope();
appContainer.bind(DI_TYPES.Transport).to(Transport).inSingletonScope();
appContainer.bind(DI_TYPES.TransportPayloadAnalyzer).to(TransportPayloadAnalyzer).inSingletonScope();
appContainer.bind(DI_TYPES.TransportErrorInterceptor).to(TransportErrorInterceptor).inSingletonScope();
appContainer.bind(DI_TYPES.TransportResponseFactory).to(TransportResponseFactory).inSingletonScope();

bindInSingleton(FetchJsonTransportFactory);
