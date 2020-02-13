import * as React from 'react';
import * as R from 'ramda';

import { IUniversalContainerProps } from '../../definition';
import { NotificationActionBuilder } from '../../action';
import { nvl } from '../../util';
import { Snackbar } from '../snackbar';
import { UniversalContainer } from '../base/universal.container';

export class NotificationContainer extends UniversalContainer {

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
        message={nvl(notification.error, notification.info)}
        error={hasError}
        afterShow={this.clearCurrentNotification}>
      </Snackbar>
    );
  }

  /**
   * @stable [13.02.2020]
   */
  private clearCurrentNotification(): void {
    this.appStore.dispatch(NotificationActionBuilder.buildPlainClearAction());
  }
}
