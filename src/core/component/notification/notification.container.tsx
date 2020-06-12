import * as React from 'react';
import * as R from 'ramda';

import { IUniversalContainerProps } from '../../definition';
import { NotificationActionBuilder } from '../../action';
import { NvlUtils } from '../../util';
import { Snackbar } from '../snackbar';
import { GenericContainer } from '../base/generic.container';

export class NotificationContainer extends GenericContainer {

  /**
   * @stable [13.02.2020]
   * @param {IUniversalContainerProps} props
   */
  constructor(props: IUniversalContainerProps) {
    super(props);
    this.clearCurrentNotification = this.clearCurrentNotification.bind(this);
  }

  /**
   * @stable [13.02.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
      <React.Fragment>
        {this.props.children}
        {this.snackbarElement}
      </React.Fragment>
    );
  }

  /**
   * @stable [13.02.2020]
   * @returns {JSX.Element}
   */
  private get snackbarElement(): JSX.Element {
    const {notification} = this.props;
    const hasError = !R.isNil(notification.error);

    return (
      <Snackbar
        message={NvlUtils.nvl(notification.error, notification.info)}
        error={hasError}
        afterShow={this.clearCurrentNotification}>
      </Snackbar>
    );
  }

  /**
   * @stable [12.06.2020]
   */
  private clearCurrentNotification(): void {
    this.dispatchPlainAction(NotificationActionBuilder.buildPlainClearAction());
  }
}
