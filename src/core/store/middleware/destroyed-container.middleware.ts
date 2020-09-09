import {
  EffectsAction,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  ListActionBuilder,
} from '../../component/action.builder';
import { IDestroyedContainerMiddlewareConfigEntity } from '../../definition';
import {
  FilterActionBuilder,
  FormActionBuilder,
  TabPanelActionBuilder,
} from '../../action';

/**
 * @stable [10.09.2020]
 * @middleware
 *
 * @param config
 */
const makeDestroyedContainerMiddleware =
  (config: IDestroyedContainerMiddlewareConfigEntity): IEffectsAction[] =>
    [
      ...(config.tabPanelsSections || [])
        .map((tabPanelSection) => TabPanelActionBuilder.buildDestroyAction(tabPanelSection)),
      ...(config.formsSections || [])
        .map((formSection) => FormActionBuilder.buildDestroyAction(formSection)),
      ...(config.filtersSections || [])
        .map((filterSection) => FilterActionBuilder.buildDestroyAction(filterSection)),
      ...(config.listsSections || [])
        .map((listSection) => ListActionBuilder.buildDestroyAction(listSection)),
      ...(config.customActions || [])
        .map((customAction) => EffectsAction.create(customAction))
    ];

/**
 * @stable [10.09.2020]
 */
export class DestroyedContainerMiddlewareFactories {
  public static readonly destroyedContainerMiddleware = makeDestroyedContainerMiddleware;
}
