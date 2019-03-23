import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import {
  DestroyedComponentTypeEnum,
  IDestroyedComponentMiddlewareConfig,
  IDestroyedFormMiddlewareConfig,
  makeDestroyedComponentMiddleware,
} from '../middleware';
import { ListActionBuilder } from '../../component/list/list-action.builder';
import { FormActionBuilder } from '../../component/form/form-action.builder';

/**
 * @stable [22.03.2019]
 * @param {IDestroyedComponentMiddlewareConfig} config
 * @returns {string}
 */
const toDestroyedComponentType = (config: IDestroyedComponentMiddlewareConfig): string => {
  switch (config.type) {
    case DestroyedComponentTypeEnum.FORM:
      return FormActionBuilder.buildDestroyActionType(config.sectionName);
    case DestroyedComponentTypeEnum.LIST:
      return ListActionBuilder.buildDestroyActionType(config.sectionName);
  }
};

/**
 * @stable [21.01.2019]
 * @param {IDestroyedFormMiddlewareConfig} config
 * @returns {() => void}
 */
export function makeDestroyedComponentEffectsProxy(config: IDestroyedComponentMiddlewareConfig): () => void {
  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      @EffectsService.effects(toDestroyedComponentType(config))
      public $onDestroy(): IEffectsAction[] {
        return makeDestroyedComponentMiddleware(config);
      }
    }
  };
}
