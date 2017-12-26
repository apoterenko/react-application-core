import { IDialog, IDialogInternalProps } from '../../../component/dialog';
import { IFormProps } from '../form.interface';
import { IEntity } from '../../../definition.interface';

export interface IFormDialog extends IDialog<IFormDialogInternalProps> {
}

export interface IFormDialogInternalProps extends IDialogInternalProps,
                                                  IFormProps<IEntity> {
}

export const FORM_DIALOG_REF = 'formDialog';
