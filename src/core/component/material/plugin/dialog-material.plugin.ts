import { MDCDialog } from '@material/dialog';

import { sequence } from '../../../util';
import { MaterialPlugin } from './material.plugin';
import { IUniversalDialog, INativeMaterialDialogComponent } from '../../dialog';

export class DialogMaterialPlugin<TDialog extends IUniversalDialog>
  extends MaterialPlugin<TDialog, INativeMaterialDialogComponent> {

  /**
   * @stable [04.10.2018]
   * @param {TDialog} dialog
   */
  constructor(dialog: TDialog) {
    super(dialog, MDCDialog);

    dialog.activate = sequence(dialog.activate, this.onMenuActivate, this);
    dialog.onClose = sequence(dialog.onClose, this.onClose, this);
    dialog.onAccept = sequence(dialog.onAccept, this.onAccept, this);
  }

  /**
   * @stable [04.10.2018]
   */
  private onMenuActivate(): void {
    this.mdc.open();
  }

  /**
   * @stable [04.10.2018]
   */
  private onAccept(): void {
    this.mdc.close();
  }

  /**
   * @stable [04.10.2018]
   */
  private onClose(): void {
    this.mdc.close();
  }
}
