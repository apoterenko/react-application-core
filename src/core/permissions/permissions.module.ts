import { appContainer, DI_TYPES } from '../di';
import { PermissionsService } from './permissions.service';

appContainer.bind(DI_TYPES.Permission).to(PermissionsService).inSingletonScope();
