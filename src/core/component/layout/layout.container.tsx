import * as React from 'react';
import * as R from 'ramda';

import { Snackbar } from '../../component/snackbar';
import { BaseContainer } from '../../component/base';
import { NOTIFICATION_CLEAR_ACTION_TYPE } from '../../notification';
import { IContainerProps } from '../../props-definitions.interface';

export class LayoutContainer<TProps extends IContainerProps, TState = {}> extends BaseContainer<TProps, TState> {

  /**
   * @stable [19.08.2018]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.clearAllNotifications = this.clearAllNotifications.bind(this);
  }

  /**
   * @stable [19.08.2018]
   * @returns {JSX.Element}
   */
  protected get snackbarElement(): JSX.Element {
    const {notification} = this.props;
    const message = notification && (notification.error || notification.info);
    return ( // TODO
      <Snackbar message={message as any}
                error={!R.isNil(notification.error)}
                afterShow={this.clearAllNotifications}>
      </Snackbar>
    );
  }

  /**
   * @stable [19.08.2018]
   */
  private clearAllNotifications(): void {
    this.dispatchCustomType(NOTIFICATION_CLEAR_ACTION_TYPE);
  }
}
