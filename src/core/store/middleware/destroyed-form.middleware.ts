import { IEffectsAction } from 'redux-effects-promise';

import { IDestroyedFormMiddlewareConfig } from './middleware.interface';
import { FormActionBuilder } from '../../component/form/form-action.builder';

/**
 * @stable [21.01.2019]
 * @param {IDestroyedFormMiddlewareConfig} config
 * @returns {IEffectsAction[]}
 */
export const makeDestroyedFormMiddleware = (config: IDestroyedFormMiddlewareConfig): IEffectsAction[] => {
  return [
    FormActionBuilder.buildDestroyAction(config.formSection)
  ];
};
