import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import {
  DestroyedContainerTypesEnum,
  IDestroyedContainerMiddlewareConfigEntity,
} from '../../definition';
import { makeDestroyedContainerMiddleware } from '../middleware';
import { ListActionBuilder } from '../../component/action.builder';
import {
  FilterActionBuilder,
  FormActionBuilder,
  TabPanelActionBuilder,
} from '../../action';

/**
 * @stable [27.04.2020]
 * @param {IDestroyedContainerMiddlewareConfigEntity} cfg
 * @returns {string}
 */
const actionType = (cfg: IDestroyedContainerMiddlewareConfigEntity): string => {
  switch (cfg.type) {
    case DestroyedContainerTypesEnum.FILTER:
      return FilterActionBuilder.buildDestroyActionType(cfg.sectionName);
    case DestroyedContainerTypesEnum.FORM:
      return FormActionBuilder.buildDestroyActionType(cfg.sectionName);
    case DestroyedContainerTypesEnum.LIST:
      return ListActionBuilder.buildDestroyActionType(cfg.sectionName);
    case DestroyedContainerTypesEnum.TAB_PANEL:
      return TabPanelActionBuilder.buildDestroyActionType(cfg.sectionName);
  }
};

/**
 * @effects-proxy-factory
 * @stable [09.09.2020]
 *
 * @param config
 */
export const makeDestroyedContainerEffectsProxy = (config: IDestroyedContainerMiddlewareConfigEntity): () => void =>
  (): void => {

    // Define the class only
    @provideInSingleton(Effects)
    class Effects {

      @EffectsService.effects(actionType(config))
      public $onDestroy = (): IEffectsAction[] => makeDestroyedContainerMiddleware(config)
    }
  };
