import { Dialog } from '../../dialog/dialog.component';

import { IFormDialogProps } from './form-dialog.interface';

export class FormDialog extends Dialog<IFormDialogProps> {

  public static defaultProps: IFormDialogProps = {
    title: 'Changes you made will not be saved',
    closeMessage: 'Cancel',
    acceptMessage: 'Discard',
  };

  /**
   * @stable [31.05.2018]
   */
  public activate(): void {
    if (this.isDialogVisible()) {
      super.activate();
    } else {
      this.onAccept();
    }
  }

  /**
   * @stable [04.08.2018]
   */
  protected isDialogVisible(): boolean {
    return this.props.form.dirty;
  }
}
