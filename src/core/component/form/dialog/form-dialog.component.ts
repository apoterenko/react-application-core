import { Dialog } from '../../dialog';

import { INITIAL_APPLICATION_FORM_STATE } from '../form.interface';
import { IFormDialogInternalProps } from './form-dialog.interface';

export class FormDialog extends Dialog<FormDialog, IFormDialogInternalProps> {

  public static defaultProps: IFormDialogInternalProps = {
    title: 'You have unsaved changes',
    message: 'Changes you made will not be saved.',
    closeMessage: 'Cancel',
    acceptMessage: 'Discard',
    form: INITIAL_APPLICATION_FORM_STATE,
  };

  public activate(): void {
    if (this.props.form.dirty) {
      super.activate();
    } else {
      this.onAccept();
    }
  }
}
