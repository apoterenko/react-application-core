import { appContainer, DI_TYPES } from '../di';
import { VueRouter } from './vue-router.service';

/**
 * @stable [23.10.2018]
 */
appContainer.bind(DI_TYPES.Router).to(VueRouter).inSingletonScope();
