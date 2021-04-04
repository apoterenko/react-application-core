import { IAutoResetWrapper } from '../definitions.interface';
import { IDialogConfigurationEntity } from './dialog-definition.interface';
import { IExtendedFormEntity } from './form-definition.interface';
import { IGenericContainerProps } from './generic-container-definition.interface';

/**
 * @generic-container-entity
 * @stable [09.05.2020]
 */
export interface IGenericFilterFormDialogContainerEntity
  extends IAutoResetWrapper,
    IDialogConfigurationEntity,
    IExtendedFormEntity {
}

/**
 * @props
 * @stable [09.05.2020]
 */
export interface IFilterFormDialogContainerProps
  extends IGenericContainerProps,
    IGenericFilterFormDialogContainerEntity {
}

/**
 * @stable [09.05.2020]
 */
export const FILTER_FORM_DIALOG_ACCEPT_ACTION_TYPE = 'filter.form.dialog.accept';
export const FILTER_FORM_DIALOG_CLEAR_ACTION_TYPE = 'filter.form.dialog.clear';
export const FILTER_FORM_DIALOG_RESET_ACTION_TYPE = 'filter.form.dialog.reset';
