import { appContainer, DI_TYPES } from '../../di';
import { TransportResponseFactory } from './transport-response-factory.service';
import './accessor/transport-response-accessor.module';

appContainer.bind(DI_TYPES.TransportResponseFactory).to(TransportResponseFactory).inSingletonScope();
