import {
  IActivateDialogConfigEntity,
  IUnsavedFormChangesDialogProps,
} from '../../../definition';
import {
  FormUtils,
  PropsUtils,
} from '../../../util';
import { BaseDialog } from '../base-dialog.component';

/**
 * @component-impl
 * @stable [01.08.2020]
 *
 * Please use the "Mappers.unsavedFormChangesDialogProps"
 */
export class UnsavedFormChangesDialog extends BaseDialog<IUnsavedFormChangesDialogProps> {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<IUnsavedFormChangesDialogProps>({
    confirm: true,
  }, BaseDialog);

  /**
   * @stable [10.10.2020]
   * @param payload
   */
  public activate(payload?: IActivateDialogConfigEntity): void {
    if (FormUtils.isChanged(this.originalProps)) { // We can't use dirty flag because of the default changes (!)
      super.activate(payload);
    } else {
      this.onAcceptClick();
    }
  }

  /**
   * @stable [10.10.2020]
   */
  protected get acceptText(): string {
    return this.mergedProps.acceptText || this.settings.messages.DIALOG_DISCARD;
  }

  /**
   * @stable [10.10.2020]
   */
  protected get title(): string | boolean {
    const {
      title,
    } = this.originalProps;

    return title === false
      ? title
      : (title || this.settings.messages.CHANGES_YOU_MADE_WILL_NOT_BE_SAVED);
  }
}
