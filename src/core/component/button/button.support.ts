import { orDefault } from '../../util';
import { IApplicationMessagesSettings } from '../../settings';
import { IReactButtonProps } from '../../definition';

/**
 * @stable - 19.04.2018
 * @param {UniversalButtonEntityT} entity
 * @returns {boolean | undefined}
 */
export const isButtonDisabled = (entity: IReactButtonProps) => entity.disabled || entity.progress;

/**
 * @stable - 19.04.2018
 * @param {UniversalButtonEntityT} entity
 * @param {IApplicationMessagesSettings} messages
 * @returns {string}
 */
export const getButtonText = (entity: IReactButtonProps,
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
export const getButtonIcon = (entity: IReactButtonProps,
                              progressIcon: string,
                              errorIcon: string): string => (
  entity.progress
    ? progressIcon
    : (entity.error ? errorIcon : entity.icon as string)
);
