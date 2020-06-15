import * as React from 'react';

import { GenericContainer } from '../../base/generic.container';
import { IUnsavedFormChangesDialogContainerProps } from '../../../definition';
import { Mappers } from '../../../util';
import { UnsavedFormChangesDialog } from './unsaved-form-changes-dialog.component';

/**
 * @component-container-impl
 * @stable [15.06.2020]
 *
 * Please use the "Mappers.unsavedFormChangesDialogContainerProps"
 */
export class UnsavedFormChangesDialogContainer
  extends GenericContainer<IUnsavedFormChangesDialogContainerProps> {

  /**
   * @stable [15.06.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const originalProps = this.originalProps;
    const {
      dfccStoreProxy,
    } = originalProps.proxyContainer;

    return (
      <UnsavedFormChangesDialog
        {...Mappers.unsavedFormChangesDialogContainerPropsAsUnsavedFormChangesDialogProps(originalProps)}
        ref={dfccStoreProxy.getDialogRef()}
        onAccept={dfccStoreProxy.goBack}/>
    );
  }
}
