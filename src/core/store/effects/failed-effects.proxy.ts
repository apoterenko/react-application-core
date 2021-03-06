import {
  EffectsActionBuilder,
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import {
  ListActionBuilder,
} from '../../component/action.builder';
import {
  ConnectorActionBuilder,
  DictionariesActionBuilder,
  FormActionBuilder,
  NotificationActionBuilder,
} from '../../action';

export const makeFailedEffectsProxy = (actionType: string,
                                       actionsResolver?: (action: IEffectsAction) => IEffectsAction[]): () => void =>
  (): void => {

  @provideInSingleton(Effects)
  class Effects {

    @EffectsService.effects(actionType)
    public $onError(action: IEffectsAction): IEffectsAction[] {
      return (actionsResolver ? actionsResolver(action) : []).concat(
        NotificationActionBuilder.buildErrorAction(action)
      );
    }
  }
};

/**
 * @stable [18.07.2020]
 * @param {string} actionType
 * @returns {() => void}
 */
export const makeErrorEffectsProxy = (actionType: string) =>
  makeFailedEffectsProxy(EffectsActionBuilder.buildErrorActionType(actionType));

/**
 * @stable [08.09.2020]
 * @param section
 */
export const makeListLazyLoadErrorEffectsProxy = (section: string): () => void =>
  makeFailedEffectsProxy(ListActionBuilder.buildLazyLoadErrorActionType(section));

/**
 * @stable [26.07.2020]
 * @param actionType
 */
export const makeFormSubmitErrorEffectsProxy = (actionType: string) =>
  makeFailedEffectsProxy(FormActionBuilder.buildSubmitErrorActionType(actionType));

/**
 * @stable [26.07.2020]
 * @param section
 */
export const makeListLoadErrorEffectsProxy = (section: string): () => void =>
  makeFailedEffectsProxy(ListActionBuilder.buildLoadErrorActionType(section));

/**
 * @stable [14.09.2020]
 * @param section
 */
export const makeConnectorInitErrorEffectsProxy = (section: string): () => void =>
  makeFailedEffectsProxy(ConnectorActionBuilder.buildInitErrorActionType(section));

/**
 * @stable [14.12.2020]
 * @param section
 */
export const makeDictionaryLoadErrorEffectsProxy = (section: string): () => void =>
  makeFailedEffectsProxy(DictionariesActionBuilder.buildLoadErrorActionType(section));
