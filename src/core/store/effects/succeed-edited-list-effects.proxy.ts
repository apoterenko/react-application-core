import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import { FormActionBuilder } from '../../action';
import { ISucceedEditedListMiddlewareConfigEntity } from '../../definition';
import { makeSucceedEditedListMiddleware } from '../middleware';
import { provideInSingleton } from '../../di';
import { SectionUtils } from '../../util';

/**
 * @effects-proxy-factory
 * @stable [09.09.2020]
 *
 * @param config
 */
export const makeSucceedEditedListEffectsProxy = <TState = {}>(config: ISucceedEditedListMiddlewareConfigEntity<TState>) =>
  (): void => {

    @provideInSingleton(Effects)
    class Effects {

      /**
       * @stable [09.09.2020]
       * @param action
       * @param state
       */
      @EffectsService.effects(FormActionBuilder.buildSubmitDoneActionType(SectionUtils.asFormSection(config)))
      public $onFormSubmitDone = (action: IEffectsAction, state: TState): IEffectsAction[] =>
        makeSucceedEditedListMiddleware({...config, action, state})
    }
  };
