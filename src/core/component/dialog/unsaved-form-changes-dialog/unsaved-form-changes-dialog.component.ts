import {
  IActivateDialogConfigEntity,
  IUnsavedFormChangesDialogProps,
} from '../../../definition';
import { isDirty } from '../../../util';
import { BaseDialog } from '../base-dialog.component';

export class UnsavedFormChangesDialog extends BaseDialog<IUnsavedFormChangesDialogProps> {

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

  /**
   * @stable [30.01.2020]
   * @returns {string}
   */
  protected get acceptText(): string {
    return this.props.acceptText || this.settings.messages.DIALOG_DISCARD;
  }

  /**
   * @stable [30.01.2020]
   * @returns {string | boolean}
   */
  protected get title(): string | boolean {
    const {title} = this.props;
    return title === false
      ? title
      : (title || this.settings.messages.CHANGES_YOU_MADE_WILL_NOT_BE_SAVED);
  }
}
