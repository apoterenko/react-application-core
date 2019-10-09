import * as React from 'react';

import {
  I$$dialogFormChangesConfirmStoreProxyWrapper,
  IActivateDialogWrapper,
  IGoBackWrapper,
} from '../../../../definitions.interface';
import {
  IDispatcher,
  IUniversalDialog,
} from '../../../../definition';

/**
 * @stable [03.10.2019]
 */
export interface IDialogFormChangesConfirmStoreProxy
  extends IDispatcher,
    IActivateDialogWrapper,
    IGoBackWrapper {
  getDialogRef<T extends IUniversalDialog>(): React.RefObject<T>;
}

/**
 * @stable [03.10.2019]
 */
export interface IDialogFormChangesConfirmStoreProxyEntity
  extends I$$dialogFormChangesConfirmStoreProxyWrapper<IDialogFormChangesConfirmStoreProxy> {
}
