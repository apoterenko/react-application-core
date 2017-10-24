import { IDialogInternalProps } from '../../../component/dialog';
import { IFormProps } from '../form.interface';
import { IEntity } from '../../../definition.interface';

export interface IFormDialogInternalProps extends IDialogInternalProps,
                                                  IFormProps<IEntity> {
}
