import * as React from 'react';

import {
  IActivateDialogWrapper,
  IGoBackWrapper,
} from '../definitions.interface';
import { IDispatcher } from './dispatcher-definition.interface';
import { IUniversalDialog } from './dialog-definition.interface';

/**
 * @stable [27.11.2019]
 */
export interface IDialogFormChangesConfirmStoreProxy
  extends IDispatcher,
    IActivateDialogWrapper,
    IGoBackWrapper {
  getDialogRef<T extends IUniversalDialog>(): React.RefObject<T>;
}
