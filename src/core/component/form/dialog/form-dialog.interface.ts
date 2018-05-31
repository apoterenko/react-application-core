import { IUniversalDialogProps } from '../../dialog';
import { IBasicFormWrapperEntity } from '../../../entities-definitions.interface';

export interface IFormDialogProps extends IUniversalDialogProps,
                                          IBasicFormWrapperEntity {
}

export const FORM_DIALOG_REF = 'formDialog';
