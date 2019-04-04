import { appContainer, DI_TYPES } from '../../di';
import { FullScreenManager } from './full-screen-manager.service';

appContainer.bind(DI_TYPES.FullScreenManager).to(FullScreenManager).inSingletonScope();
