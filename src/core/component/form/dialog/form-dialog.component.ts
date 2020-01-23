import { BaseDialog } from '../../dialog/base-dialog.component';
import { IActivateDialogConfigEntity } from '../../../definition';
import { IFormDialogProps } from './form-dialog.interface';
import { isDirty } from '../../../util';

export class FormDialog extends BaseDialog<IFormDialogProps> {

  public static defaultProps: IFormDialogProps = {
    title: 'Changes you made will not be saved',
    closeText: 'Cancel',
    acceptText: 'Discard',
  };

  /**
   * @stable [05.01.2020]
   * @param {IActivateDialogConfigEntity} payload
   */
  public activate(payload?: IActivateDialogConfigEntity): void {
    if (isDirty(this.props.form)) {
      super.activate(payload);
    } else {
      this.onAcceptClick();
    }
  }
}
