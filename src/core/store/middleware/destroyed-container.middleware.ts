import { IEffectsAction, EffectsAction } from 'redux-effects-promise';

import {
  ListActionBuilder,
  FormActionBuilder,
} from '../../component/action.builder';
import { IDestroyedContainerMiddlewareConfigEntity } from '../../definition';

/**
 * @stable [27.08.2019]
 * @param {IDestroyedContainerMiddlewareConfigEntity} config
 * @returns {IEffectsAction[]}
 */
export const makeDestroyedContainerMiddleware = (config: IDestroyedContainerMiddlewareConfigEntity): IEffectsAction[] =>
  [
    ...(config.formsSections || [])
      .map((formSection) => FormActionBuilder.buildDestroyAction(formSection)),
    ...(config.listsSections || [])
      .map((listSection) => ListActionBuilder.buildDestroyAction(listSection)),
    ...(config.customActions || [])
      .map((customAction) => EffectsAction.create(customAction))
  ];
