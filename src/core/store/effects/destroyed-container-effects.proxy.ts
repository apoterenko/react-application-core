import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import {
  DestroyedContainerTypesEnum,
  IDestroyedContainerMiddlewareConfigEntity,
} from '../../definition';
import {
  makeDestroyedContainerMiddleware,
} from '../middleware';
import {
  ListActionBuilder,
} from '../../component/action.builder';
import {
  FormActionBuilder,
  TabPanelActionBuilder,
} from '../../action';

/**
 * @stable [22.03.2019]
 * @param {IDestroyedContainerMiddlewareConfigEntity} config
 * @returns {string}
 */
const toDestroyedContainerType = (config: IDestroyedContainerMiddlewareConfigEntity): string => {
  switch (config.type) {
    case DestroyedContainerTypesEnum.FORM:
      return FormActionBuilder.buildDestroyActionType(config.sectionName);
    case DestroyedContainerTypesEnum.LIST:
      return ListActionBuilder.buildDestroyActionType(config.sectionName);
    case DestroyedContainerTypesEnum.TAB_PANEL:
      return TabPanelActionBuilder.buildDestroyActionType(config.sectionName);
  }
};

/**
 * @stable [27.08.2019]
 * @param {IDestroyedContainerMiddlewareConfigEntity} config
 * @returns {() => void}
 */
export const makeDestroyedContainerEffectsProxy = (config: IDestroyedContainerMiddlewareConfigEntity): () => void =>
  (): void => {

    // Define the class only
    @provideInSingleton(Effects)
    class Effects {

      @EffectsService.effects(toDestroyedContainerType(config))
      public $onDestroy = (): IEffectsAction[] => makeDestroyedContainerMiddleware(config)
    }
  };
