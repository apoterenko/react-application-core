import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { FormActionBuilder } from '../../component/action.builder';
import { ISucceedListFormMiddlewareConfigEntity } from '../../definition';
import { makeSucceedListFormMiddleware } from '../middleware';
import { provideInSingleton } from '../../di';

/**
 * @stable [09.10.2019]
 * @param {ISucceedListFormMiddlewareConfigEntity} config
 * @returns {() => void}
 */
export const makeSucceedListFormEffectsProxy = (config: ISucceedListFormMiddlewareConfigEntity): () => void =>
  (): void => {

    @provideInSingleton(Effects)
    class Effects {

      /**
       * @stable [09.10.2019]
       * @param {IEffectsAction} action
       * @returns {IEffectsAction[]}
       */
      @EffectsService.effects(FormActionBuilder.buildSubmitDoneActionType(config.formSection))
      public $onFormSubmitDone = (action: IEffectsAction): IEffectsAction[] =>
        makeSucceedListFormMiddleware({...config, action})
    }
  };
