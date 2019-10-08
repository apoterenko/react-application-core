import * as React from 'react';

import { BaseStoreProxy } from '../base-store.proxy';
import {
  IContainer,
  IContainerProps,
  IUniversalDialog,
} from '../../../../definition';
import { IDialogFormChangesConfirmStoreProxy } from './dialog-form-changes-confirm-store-proxy.interface';
import { namedConstructor } from '../../../../util';
import { ROUTER_BACK_ACTION_TYPE } from '../../../../router/router.interface';

@namedConstructor('$$dialogFormChangesConfirmStoreProxy')
export class DialogFormChangesConfirmStoreProxy<TStore, TProps extends IContainerProps>
  extends BaseStoreProxy<TStore, TProps>
  implements IDialogFormChangesConfirmStoreProxy {

  public readonly dialogRef = React.createRef<IUniversalDialog>();

  /**
   * @stable [03.10.2019]
   * @param {IContainer<TProps extends IContainerProps>} container
   */
  constructor(readonly container: IContainer<TProps>) {
    super(container);
    this.goBack = this.goBack.bind(this);
    this.activateDialog = this.activateDialog.bind(this);
  }

  /**
   * @stable [03.10.2019]
   */
  public activateDialog(): void {
    this.dialogRef.current.activate();
  }

  /**
   * @stable [03.10.2019]
   */
  public goBack(): void {
    this.dispatchCustomType(ROUTER_BACK_ACTION_TYPE);
  }

  /**
   * @stable [03.10.2019]
   * @returns {React.RefObject<T extends IUniversalDialog>}
   */
  public getDialogRef<T extends IUniversalDialog>(): React.RefObject<T> {
    return this.dialogRef as React.RefObject<T>;
  }
}