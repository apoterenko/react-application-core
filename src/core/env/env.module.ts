import { appContainer, DI_TYPES } from '../di';
import { IEnvironment } from '../definition';
import { Environment } from './env.service';

/**
 * @stable [11.09.2019]
 */
appContainer.bind<IEnvironment>(DI_TYPES.Environment).to(Environment).inRequestScope();
