import { IUniversalDialog, IUniversalDialogProps } from '../../dialog';
import { IFormWrapperEntity } from '../../../entities-definitions.interface';

export interface IFormDialog extends IUniversalDialog<IFormDialogInternalProps> {
}

export interface IFormDialogInternalProps extends IUniversalDialogProps,
                                                  IFormWrapperEntity {
}

export const FORM_DIALOG_REF = 'formDialog';
