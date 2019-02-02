import { appContainer, DI_TYPES } from '../../../di';
import { TransportRequestPayloadFactory } from './transport-request-payload-factory.service';

appContainer.bind(DI_TYPES.TransportRequestPayloadFactory).to(TransportRequestPayloadFactory).inSingletonScope();
