import { IDialog, IDialogInternalProps } from '../../dialog';
import { IFormWrapperEntity } from '../../../entities-definitions.interface';
import { IEntity } from '../../../definitions.interface';

export interface IFormDialog extends IDialog<IFormDialogInternalProps> {
}

export interface IFormDialogInternalProps extends IDialogInternalProps,
                                                  IFormWrapperEntity<IEntity> {
}

export const FORM_DIALOG_REF = 'formDialog';
