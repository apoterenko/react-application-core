import { appContainer, DI_TYPES } from '../di';
import { PermissionService } from './permission.service';

appContainer.bind(DI_TYPES.Permission).to(PermissionService).inSingletonScope();
