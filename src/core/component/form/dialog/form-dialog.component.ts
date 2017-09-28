import { Dialog } from '../../../component/dialog';

import { INITIAL_APPLICATION_FORM_STATE } from '../form.interface';
import { IFormDialogInternalProps } from './form-dialog.interface';

export class FormDialog extends Dialog<FormDialog, IFormDialogInternalProps> {

  public static defaultProps: IFormDialogInternalProps = {
    title: 'Attention',
    message: 'There are unsaved changes.',
    closeMessage: 'Cancel',
    acceptMessage: 'Ok',
    form: INITIAL_APPLICATION_FORM_STATE,
  };

  constructor(props: IFormDialogInternalProps) {
    super(props);
  }

  public activate(): void {
    if (this.props.form.dirty) {
      super.activate();
    } else {
      this.onAccept();
    }
  }
}
