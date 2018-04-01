import { IDialog, IDialogInternalProps } from '../../dialog';
import { IDefaultFormWrapperEntity } from '../../../entities-definitions.interface';

export interface IFormDialog extends IDialog<IFormDialogInternalProps> {
}

export interface IFormDialogInternalProps extends IDialogInternalProps,
                                                  IDefaultFormWrapperEntity {
}

export const FORM_DIALOG_REF = 'formDialog';
