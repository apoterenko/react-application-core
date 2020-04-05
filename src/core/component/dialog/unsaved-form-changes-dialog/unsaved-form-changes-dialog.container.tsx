import * as React from 'react';

import { IUnsavedFormChangesDialogContainerProps } from '../../../definition';
import { GenericContainer } from '../../base/generic.container';
import { UnsavedFormChangesDialog } from './unsaved-form-changes-dialog.component';

export class UnsavedFormChangesDialogContainer
  extends GenericContainer<IUnsavedFormChangesDialogContainerProps> {

  /**
   * @stable [05.04.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const {
      dialogConfiguration,
      proxyContainer,
    } = this.props;

    const proxy = proxyContainer.dfccStoreProxy;

    return (
      <UnsavedFormChangesDialog
        {...dialogConfiguration}
        ref={proxy.getDialogRef()}
        onAccept={proxy.goBack}/>
    );
  }
}
