import {
  IActivateDialogConfigEntity,
  IUnsavedFormChangesDialogProps,
} from '../../../definition';
import { FormUtils } from '../../../util';
import { BaseDialog } from '../base-dialog.component';

/**
 * @component-impl
 * @stable [11.05.2020]
 *
 * Please use the "Mappers.TODO"
 */
export class UnsavedFormChangesDialog extends BaseDialog<IUnsavedFormChangesDialogProps> {

  public static readonly defaultProps: IUnsavedFormChangesDialogProps = {
    confirm: true,
  };

  /**
   * @stable [11.05.2020]
   * @param {IActivateDialogConfigEntity} payload
   */
  public activate(payload?: IActivateDialogConfigEntity): void {
    if (FormUtils.isChanged(this.props)) { // We can't use dirty flag because of the default changes (!)
      super.activate(payload);
    } else {
      this.onAcceptClick();
    }
  }

  /**
   * @stable [11.05.2020]
   * @returns {string}
   */
  protected get acceptText(): string {
    return this.props.acceptText || this.settings.messages.DIALOG_DISCARD;
  }

  /**
   * @stable [11.05.2020]
   * @returns {string | boolean}
   */
  protected get title(): string | boolean {
    const {title} = this.props;
    return title === false
      ? title
      : (title || this.settings.messages.CHANGES_YOU_MADE_WILL_NOT_BE_SAVED);
  }
}
