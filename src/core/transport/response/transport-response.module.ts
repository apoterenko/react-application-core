import { appContainer, DI_TYPES } from '../../di';
import './accessor/transport-response-accessor.module';
import { TransportResponseFactory } from './transport-response-factory.service';

appContainer.bind(DI_TYPES.TransportResponseFactory).to(TransportResponseFactory).inSingletonScope();
