import { IForwardedRefWrapper } from '../../../definitions.interface';
import { IContainerProps } from '../../../props-definitions.interface';
import { IEditableEntityFormWrapperEntity } from '../../../entities-definitions.interface';

/**
 * @stable [10.03.2019]
 */
export interface IFilterFormDialogContainerProps<TRef>
  extends IContainerProps,
    IForwardedRefWrapper<TRef>,
    IEditableEntityFormWrapperEntity {
}

/**
 * @stable [10.03.2019]
 */
export const FILTER_FORM_DIALOG_ACCEPT_ACTION_TYPE = 'filter.form.dialog.accept';
export const FILTER_FORM_DIALOG_CLEAR_ACTION_TYPE = 'filter.form.dialog.clear';
