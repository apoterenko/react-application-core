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

/**
 * @stable [25.11.2019]
 * @param {string} section
 * @returns {() => void}
 */
export const makeFailedConnectorInitEffectsProxy = (section: string): () => void =>
  makeFailedEffectsProxy(ConnectorActionBuilder.buildInitErrorActionType(section));
