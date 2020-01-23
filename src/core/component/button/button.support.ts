import * as R from 'ramda';

import { getSettings } from '../../di';
import { IButtonProps } from '../../definition';

export const isButtonDisabled = (entity: IButtonProps) => entity.disabled || entity.progress;

export const getButtonText = (entity: IButtonProps): string => {
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

export const getButtonIcon = (entity: IButtonProps,
                              progressIcon: string,
                              errorIcon: string): string => (
  entity.progress
    ? progressIcon
    : (entity.error ? errorIcon : entity.icon as string)
);

export const hasIconButton = (props: IButtonProps) => !R.isNil(props.icon) && props.icon !== false;
