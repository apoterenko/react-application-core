import { MDCDialog } from '@material/dialog';

import { IUniversalDialog2, INativeMaterialDialogComponent } from '../../dialog';
import { MaterialPlugin } from './material.plugin';
import { sequence, isFn } from '../../../util';

export class DialogMaterialPlugin<TDialog extends IUniversalDialog2>
  extends MaterialPlugin<TDialog, INativeMaterialDialogComponent> {

  /**
   * @stable [04.10.2018]
   * @param {TDialog} dialog
   */
  constructor(dialog: TDialog) {
    super(dialog, MDCDialog);

    this.onDialogClosed = this.onDialogClosed.bind(this);

    dialog.activate = sequence(dialog.activate, this.activate, this);
    dialog.onAccept = sequence(dialog.onAccept, this.deactivate, this);
    dialog.onClose = sequence(dialog.onClose, this.deactivate, this);
  }

  /**
   * @stable [17.06.2019]
   */
  public componentDidMount(): void {
    super.componentDidMount();

    if (this.doesMdcExist) {
      this.mdc.listen('MDCDialog:closed', this.onDialogClosed);
    }
  }

  /**
   * @stable [17.06.2019]
   */
  private activate(): void {
    this.mdc.open();
  }

  /**
   * @stable [04.10.2018]
   */
  private deactivate(): void {
    this.mdc.close();
  }

  /**
   * @stable [17.06.2019]
   */
  private onDialogClosed(): void {
    const onDeactivateFn = this.component.onDeactivate;
    if (isFn(onDeactivateFn)) {
      onDeactivateFn.call(this.component);
    }
  }
}
