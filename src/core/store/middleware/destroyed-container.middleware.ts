import {
  EffectsAction,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  FormActionBuilder,
  ListActionBuilder,
  TabPanelActionBuilder,
} from '../../component/action.builder';
import { IDestroyedContainerMiddlewareConfigEntity } from '../../definition';

/**
 * @stable [27.08.2019]
 * @param {IDestroyedContainerMiddlewareConfigEntity} config
 * @returns {IEffectsAction[]}
 */
export const makeDestroyedContainerMiddleware = (config: IDestroyedContainerMiddlewareConfigEntity): IEffectsAction[] =>
  [
    ...(config.tabPanelsSections || [])
      .map((tabPanelSection) => TabPanelActionBuilder.buildDestroyAction(tabPanelSection)),
    ...(config.formsSections || [])
      .map((formSection) => FormActionBuilder.buildDestroyAction(formSection)),
    ...(config.listsSections || [])
      .map((listSection) => ListActionBuilder.buildDestroyAction(listSection)),
    ...(config.customActions || [])
      .map((customAction) => EffectsAction.create(customAction))
  ];
