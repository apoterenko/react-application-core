import { Dialog } from '../../dialog';

import { IFormDialogInternalProps } from './form-dialog.interface';

export class FormDialog extends Dialog<FormDialog, IFormDialogInternalProps> {

  public static defaultProps: IFormDialogInternalProps = {
    title: 'You have unsaved changes',
    message: 'Changes you made will not be saved.',
    closeMessage: 'Cancel',
    acceptMessage: 'Discard',
  };

  public activate(): void {
    if (this.props.form.dirty) {
      super.activate();
    } else {
      this.onAccept();
    }
  }
}
