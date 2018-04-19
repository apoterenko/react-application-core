import { orDefault } from '../../util';
import { IUniversalButtonEntity } from '../../entities-definitions.interface';
import { IUniversalButtonConfiguration } from '../../configurations-definitions.interface';
import { IApplicationMessagesSettings } from '../../settings';

/* @stable - 19.04.2018 */
export type UniversalButtonEntityT = IUniversalButtonEntity & IUniversalButtonConfiguration;

/**
 * @stable - 19.04.2018
 * @param {UniversalButtonEntityT} entity
 * @returns {boolean | undefined}
 */
export const isButtonDisabled = (entity: UniversalButtonEntityT) => entity.disabled || entity.progress;

/**
 * @stable - 19.04.2018
 * @param {UniversalButtonEntityT} entity
 * @param {IApplicationMessagesSettings} messages
 * @returns {string}
 */
export const getButtonText = (entity: UniversalButtonEntityT,
                              messages: IApplicationMessagesSettings): string => (
  entity.progress
    ? (entity.progressMessage || messages.waitingMessage)
    : orDefault<string, string>(
        entity.error,
        () => entity.errorMessage || messages.defaultErrorMessage,
        entity.text
      )
);

/**
 * @stable - 19.04.2018
 * @param {UniversalButtonEntityT} entity
 * @param {string} progressIcon
 * @param {string} errorIcon
 * @returns {string}
 */
export const getButtonIcon = (entity: UniversalButtonEntityT,
                              progressIcon: string,
                              errorIcon: string): string => (
  entity.progress
    ? progressIcon
    : (entity.error ? errorIcon : entity.icon)
);
