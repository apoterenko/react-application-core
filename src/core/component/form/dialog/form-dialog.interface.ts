import { IFormAttributes } from 'core/component/form';
import { IDialogInternalProps } from 'core/component/dialog';

export interface IFormDialogInternalProps extends IDialogInternalProps {
  attributes: IFormAttributes;
}
