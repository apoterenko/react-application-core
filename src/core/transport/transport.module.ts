import { appContainer, DI_TYPES, bindInSingleton } from '../di';
import { Transport } from './transport.service';
import { TransportErrorInterceptor } from './transport-error.interceptor';
import { FetchJsonTransportFactory } from './fetch-json-transport.factory';
import './transport.effects';
import './factory/transport-factory.module';
import './request/transport-request.module';
import './response/transport-response.module';

appContainer.bind(DI_TYPES.Transport).to(Transport).inSingletonScope();
appContainer.bind(DI_TYPES.TransportErrorInterceptor).to(TransportErrorInterceptor).inSingletonScope();

bindInSingleton(FetchJsonTransportFactory);
