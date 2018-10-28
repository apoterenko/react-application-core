import { Dialog } from '../../dialog/dialog.component';

import { IFormDialogProps } from './form-dialog.interface';

export class FormDialog extends Dialog<FormDialog, IFormDialogProps> {

  public static defaultProps: IFormDialogProps = {
    title: 'You have unsaved changes',
    message: 'Changes you made will not be saved.',
    closeMessage: 'Cancel',
    acceptMessage: 'Discard',
    ...Dialog.defaultProps,
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
