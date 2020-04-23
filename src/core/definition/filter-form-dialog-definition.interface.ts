import {
  IAutoResetWrapper,
  IForwardedRefWrapper,
} from '../definitions.interface';
import { IGenericContainerProps } from './generic-container-definition.interface';
import { IExtendedFormEditableEntity } from './form-definition.interface';

/**
 * @generic-container-entity
 * @stable [23.04.2020]
 */
export interface IGenericFilterFormDialogContainerEntity<TRef>
  extends IAutoResetWrapper,
    IExtendedFormEditableEntity,
    IForwardedRefWrapper<TRef> {
}

/**
 * @props
 * @stable [23.04.2020]
 */
export interface IFilterFormDialogContainerProps<TRef = {}>
  extends IGenericContainerProps,
    IGenericFilterFormDialogContainerEntity<TRef> {
}

/**
 * @stable [16.01.2020]
 */
export const FILTER_FORM_DIALOG_ACCEPT_ACTION_TYPE = 'filter.form.dialog.accept';
export const FILTER_FORM_DIALOG_CLEAR_ACTION_TYPE = 'filter.form.dialog.clear';
export const FILTER_FORM_DIALOG_RESET_ACTION_TYPE = 'filter.form.dialog.reset';
