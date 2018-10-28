import { IUniversalDialogProps } from '../../dialog/dialog.interface';
import { IBasicFormWrapperEntity } from '../../../entities-definitions.interface';

export interface IFormDialogProps extends IUniversalDialogProps,
                                          IBasicFormWrapperEntity {
}

export const FORM_DIALOG_REF = 'formDialog';
