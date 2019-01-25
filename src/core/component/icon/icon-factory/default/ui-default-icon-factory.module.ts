import { appContainer, DI_TYPES } from '../../../../di';

import { IUIDefaultIconFactory } from './ui-default-icon-factory.interface';
import { UIDefaultIconFactory } from './ui-default-icon-factory.service';

appContainer.bind<IUIDefaultIconFactory>(DI_TYPES.UIIconFactory).to(UIDefaultIconFactory).inSingletonScope();
