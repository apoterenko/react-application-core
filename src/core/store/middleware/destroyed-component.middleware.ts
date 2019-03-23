import { IEffectsAction } from 'redux-effects-promise';

import { ListActionBuilder } from '../../component/list/list-action.builder';
import { FormActionBuilder } from '../../component/form/form-action.builder';
import { IDestroyedComponentMiddlewareConfig } from './middleware.interface';

/**
 * @stable [22.03.2019]
 * @param {IDestroyedComponentMiddlewareConfig} config
 * @returns {IEffectsAction[]}
 */
export const makeDestroyedComponentMiddleware = (config: IDestroyedComponentMiddlewareConfig): IEffectsAction[] =>
  [
    ...(config.formsSections || [])
      .map((formSection) => FormActionBuilder.buildDestroyAction(formSection)),
    ...(config.listsSections || [])
      .map((listSection) => ListActionBuilder.buildDestroyAction(listSection))
  ];
