import { EffectsService, EffectsActionBuilder, IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import { NotificationActionBuilder } from '../../notification';
import { ListActionBuilder, FormActionBuilder } from '../../component/action.builder';

export const makeFailedEffectsProxy = (actionType: string,
                                       actionsResolver?: (action: IEffectsAction) => IEffectsAction[]): () => void =>
  (): void => {

  @provideInSingleton(Effects)
  class Effects {

    @EffectsService.effects(actionType)
    public $onError(action: IEffectsAction): IEffectsAction[] {
      return (actionsResolver ? actionsResolver(action) : []).concat(
        NotificationActionBuilder.buildErrorAction(action.error)
      );
    }
  }
};

/**
 * @stable [03.04.2019]
 * @param {string} actionType
 * @returns {() => void}
 */
export const makeFailedFormEffectsProxy = (actionType: string) =>
  makeFailedEffectsProxy(FormActionBuilder.buildSubmitErrorActionType(actionType));

/**
 * @stable [23.12.2018]
 * @param {string} section
 * @returns {() => void}
 */
export const makeFailedListLoadEffectsProxy = (section: string): () => void =>
  makeFailedEffectsProxy(ListActionBuilder.buildLoadErrorActionType(section));

/**
 * @stable [23.12.2018]
 * @param {string} section
 * @returns {() => void}
 */
export const makeFailedListLazyLoadEffectsProxy = (section: string): () => void =>
  makeFailedEffectsProxy(ListActionBuilder.buildLazyLoadErrorActionType(section));

export function makeFailedFormErrorEffectsProxy(actionType: string): () => void {
  return makeFailedEffectsProxy(
    EffectsActionBuilder.buildErrorActionType(actionType),
    (action) => [FormActionBuilder.buildSubmitFinishedAction(action.initialData.section)]
  );
}
