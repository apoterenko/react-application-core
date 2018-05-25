import { appContainer, DI_TYPES } from '../di';
import { Lock } from './lock.service';

appContainer.bind(DI_TYPES.Lock).to(Lock).inSingletonScope();
