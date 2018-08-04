import { Dialog } from '../../dialog';

import { IFormDialogProps } from './form-dialog.interface';
import { toClassName } from '../../../util';

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
   * @stable [05.08.2018]
   * @returns {string}
   */
  protected getDialogClassName(): string {
    return toClassName(
      super.getDialogClassName(),
      'rac-form-dialog'
    );
  }

  /**
   * @stable [04.08.2018]
   */
  protected isDialogVisible(): boolean {
    return this.props.form.dirty;
  }
}
