import { bindInSingleton, DI_TYPES } from '../di';
import { CryptoManager } from './crypto-manager.service';

bindInSingleton(DI_TYPES.CryptoManager, CryptoManager);
