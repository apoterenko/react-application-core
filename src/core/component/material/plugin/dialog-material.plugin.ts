import { MDCDialog } from '@material/dialog';

import { sequence } from '../../../util';
import { MaterialPlugin } from './material.plugin';
import { IUniversalDialog, INativeMaterialDialogComponent } from '../../dialog';

export class DialogMaterialPlugin<TDialog extends IUniversalDialog>
  extends MaterialPlugin<TDialog, INativeMaterialDialogComponent> {

  /**
   * @stable [17.05.2018]
   * @param {TDialog} dialog
   */
  constructor(dialog: TDialog) {
    super(dialog, MDCDialog);

    this.onAccept = this.onAccept.bind(this);
    this.onClose = this.onClose.bind(this);
    this.isOpen = this.isOpen.bind(this);

    // Complete the component behavior
    dialog.activate = sequence(dialog.activate, this.onMenuActivate, this);
    dialog.isOpen = this.isOpen;
  }

  /**
   * @stable [17.05.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();

    if (this.component.acceptable) {
      this.mdc.listen('MDCDialog:accept', this.onAccept);
    }
    if (this.component.closable) {
      this.mdc.listen('MDCDialog:cancel', this.onClose);
    }
  }

  /**
   * @stable [17.05.2018]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();

    if (this.component.acceptable) {
      this.mdc.unlisten('MDCDialog:accept', this.onAccept);
    }
    if (this.component.closable) {
      this.mdc.unlisten('MDCDialog:cancel', this.onClose);
    }
  }

  /**
   * @stable [17.05.2018]
   */
  private onMenuActivate(): void {
    this.mdc.show();
  }

  /**
   * @stable [02.08.2018]
   * @returns {boolean}
   */
  private isOpen(): boolean {
    return this.mdc.foundation_.isOpen();
  }

  /**
   * @stable [17.05.2018]
   */
  private onAccept(): void {
    this.component.onAccept();
  }

  /**
   * @stable [17.05.2018]
   */
  private onClose(): void {
    this.component.onClose();
  }
}
