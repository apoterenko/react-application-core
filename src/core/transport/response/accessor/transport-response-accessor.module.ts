import { appContainer, DI_TYPES } from '../../../di';
import { TransportResponseAccessor } from './transport-response-accessor.service';

appContainer.bind(DI_TYPES.TransportResponseAccessor).to(TransportResponseAccessor).inSingletonScope();
