import { appContainer, DI_TYPES } from '../di';

import { CryptoManager } from './crypto-manager.service';

appContainer.bind(DI_TYPES.CryptoManager).to(CryptoManager).inSingletonScope();
