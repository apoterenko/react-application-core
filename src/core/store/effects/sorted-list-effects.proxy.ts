import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { ISortedListMiddlewareConfigEntity } from '../../definition';
import { ListActionBuilder } from '../../component/action.builder';
import { makeSortedListMiddleware } from '../middleware';
import { provideInSingleton } from '../../di';

/**
 * @stable [18.10.2019]
 * @param {ISortedListMiddlewareConfigEntity} config
 * @returns {() => void}
 */
export const makeSortedListEffectsProxy = (config: ISortedListMiddlewareConfigEntity): () => void => {
  const {listSection} = config;

  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      /**
       * @stable [18.10.2019]
       * @param {IEffectsAction} action
       * @returns {IEffectsAction[]}
       */
      @EffectsService.effects(ListActionBuilder.buildSortingDirectionChangeActionType(listSection))
      public $onFormValid = (action: IEffectsAction): IEffectsAction[] =>
        makeSortedListMiddleware({...config, action})
    }
  };
};
