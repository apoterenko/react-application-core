import { MDCDialog } from '@material/dialog';

import {
  INativeMaterialDialogComponent,
  IUniversalDialog2,
} from '../../dialog';
import { MaterialPlugin } from './material.plugin';
import {
  isFn,
  sequence,
} from '../../../util';

export class DialogMaterialPlugin<TDialog extends IUniversalDialog2>
  extends MaterialPlugin<TDialog, INativeMaterialDialogComponent> {

  private onDeactivateCallback: () => void;

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
  private activate(onDeactivateCallback?: () => void): void {
    this.mdc.open();
    this.onDeactivateCallback = onDeactivateCallback;
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
    if (isFn(this.onDeactivateCallback)) {
      this.onDeactivateCallback();
    }
    this.onDeactivateCallback = null;
  }
}
