import { INITIAL_APPLICATION_FORM_STATE } from 'core/component/form';
import { Dialog } from 'core/component/dialog';

import { IFormDialogInternalProps } from './form-dialog.interface';

export class FormDialog extends Dialog<FormDialog, IFormDialogInternalProps> {

  public static defaultProps: IFormDialogInternalProps = {
    title: 'Attention',
    message: 'There are unsaved changes.',
    closeMessage: 'Cancel',
    acceptMessage: 'Ok',
    attributes: INITIAL_APPLICATION_FORM_STATE,
  };

  constructor(props: IFormDialogInternalProps) {
    super(props);
  }

  public activate(): void {
    if (this.props.attributes.dirty) {
      super.activate();
    } else {
      this.onAccept();
    }
  }
}
