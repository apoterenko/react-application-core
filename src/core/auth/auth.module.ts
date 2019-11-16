import { bindInSingleton, DI_TYPES } from '../di';
import { Auth } from './auth.service';

bindInSingleton(DI_TYPES.Auth, Auth);
