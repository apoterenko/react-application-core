import { bindInSingleton, DI_TYPES } from '../di';
import { AuthService } from './auth.service';

bindInSingleton(DI_TYPES.Auth, AuthService);
