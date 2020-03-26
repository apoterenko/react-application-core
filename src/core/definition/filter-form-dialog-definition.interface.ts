import {
  IAutoResetWrapper,
  IForwardedRefWrapper,
} from '../definitions.interface';
import { IContainerProps } from './props-definition.interface';
import { IExtendedFormEditableEntity } from './form-definition.interface';

/**
 * @stable [16.01.2020]
 */
export interface IGenericFilterFormDialogEntity<TRef>
  extends IAutoResetWrapper,
    IExtendedFormEditableEntity,
    IForwardedRefWrapper<TRef> {
}

/**
 * @stable [16.01.2020]
 */
export interface IFilterFormDialogContainerProps<TRef>
  extends IContainerProps,
    IGenericFilterFormDialogEntity<TRef> {
}

/**
 * @stable [16.01.2020]
 */
export const FILTER_FORM_DIALOG_ACCEPT_ACTION_TYPE = 'filter.form.dialog.accept';
export const FILTER_FORM_DIALOG_CLEAR_ACTION_TYPE = 'filter.form.dialog.clear';
export const FILTER_FORM_DIALOG_RESET_ACTION_TYPE = 'filter.form.dialog.reset';
