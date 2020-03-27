import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import {
  ListActionBuilder,
  TabPanelActionBuilder,
} from '../../component/action.builder';
import { IListMiddlewareConfigEntity } from '../../definition';

/**
 * @stable [18.02.2019]
 * @param {IListMiddlewareConfigEntity} config
 * @returns {() => void}
 */
export const makeLoadedListOnTabActivateEffectsProxy = (config: IListMiddlewareConfigEntity): () => void => (
  (): void => {

    @provideInSingleton(Effects)
    class Effects {

      /**
       * @stable [27.03.2020]
       * @returns {IEffectsAction}
       */
      @EffectsService.effects(TabPanelActionBuilder.buildActivateActionType(config.listSection))
      public $onTabActivate = (): IEffectsAction => ListActionBuilder.buildLoadAction(config.listSection)
    }
  }
);
