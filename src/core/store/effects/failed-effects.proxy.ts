import { EffectsService, EffectsActionBuilder, IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import { NotificationActionBuilder } from '../../notification';
import { FormActionBuilder } from '../../component/form';
import { ListActionBuilder } from '../../component/list';

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

export function makeFailedFormEffectsProxy(actionType: string): () => void {
  return makeFailedEffectsProxy(FormActionBuilder.buildSubmitErrorActionType(actionType));
}

export function makeFailedListEffectsProxy(section: string): () => void {
  return makeFailedEffectsProxy(ListActionBuilder.buildLoadErrorActionType(section));
}

export function makeFailedFormErrorEffectsProxy(actionType: string): () => void {
  return makeFailedEffectsProxy(
    EffectsActionBuilder.buildErrorActionType(actionType),
    (action) => [FormActionBuilder.buildSubmitFinishedAction(action.initialData.section)]
  );
}
