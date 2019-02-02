import { appContainer, DI_TYPES } from '../../di';
import { TransportFactory } from './transport-factory.service';

appContainer.bind(DI_TYPES.TransportFactory).to(TransportFactory).inSingletonScope();
