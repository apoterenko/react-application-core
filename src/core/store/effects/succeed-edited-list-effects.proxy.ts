import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import { FormActionBuilder } from '../../action';
import { ISucceedEditedListMiddlewareConfigEntity } from '../../definition';
import { makeSucceedEditedListMiddleware } from '../middleware';
import { provideInSingleton } from '../../di';
import { toFormSection } from '../../util';

/**
 * @stable [11.04.2020]
 * @param {ISucceedEditedListMiddlewareConfigEntity<TState>} config
 * @returns {() => void}
 */
export const makeSucceedEditedListEffectsProxy = <TState = {}>(config: ISucceedEditedListMiddlewareConfigEntity<TState>) =>
  (): void => {

    @provideInSingleton(Effects)
    class Effects {

      /**
       * @stable [11.04.2020]
       * @param {IEffectsAction} action
       * @param {TState} state
       * @returns {IEffectsAction[]}
       */
      @EffectsService.effects(FormActionBuilder.buildSubmitDoneActionType(toFormSection(config)))
      public $onFormSubmitDone = (action: IEffectsAction, state: TState): IEffectsAction[] =>
        makeSucceedEditedListMiddleware({...config, action, state})
    }
  };
