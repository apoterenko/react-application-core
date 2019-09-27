import * as R from 'ramda';

import { getSettings } from '../../di';
import { IButtonEntity, IGenericButtonEntity } from '../../definition';

/**
 * @stable - 19.04.2018
 * @param {UniversalButtonEntityT} entity
 * @returns {boolean | undefined}
 */
export const isButtonDisabled = (entity: IButtonEntity) => entity.disabled || entity.progress;

/**
 * @stable [27.09.2019]
 * @param {IGenericButtonEntity} entity
 * @returns {string}
 */
export const getButtonText = (entity: IGenericButtonEntity): string => {
  const settings = getSettings();
  return (
    entity.progress
      ? (entity.progressMessage || settings.messages.waitingMessage)
      : (
        entity.error
          ? entity.errorMessage || settings.messages.defaultErrorMessage
          : entity.text
      )
  );
};

/**
 * @stable - 19.04.2018
 * @param {UniversalButtonEntityT} entity
 * @param {string} progressIcon
 * @param {string} errorIcon
 * @returns {string}
 */
export const getButtonIcon = (entity: IButtonEntity,
                              progressIcon: string,
                              errorIcon: string): string => (
  entity.progress
    ? progressIcon
    : (entity.error ? errorIcon : entity.icon as string)
);

/**
 * @stable [23.02.2019]
 * @param {IGenericButtonEntity} props
 * @returns {boolean}
 */
export const hasIconButton = (props: IGenericButtonEntity) => !R.isNil(props.icon) && props.icon !== false;
