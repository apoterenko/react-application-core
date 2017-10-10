import * as React from 'react';

import { Snackbar } from '../../component/snackbar';
import { BaseContainer, IBaseContainerInternalProps } from '../../component/base';
import { NOTIFICATION_CLEAR_ACTION_TYPE } from '../../notification';

export class LayoutContainer<TInternalProps extends IBaseContainerInternalProps>
    extends BaseContainer<TInternalProps, {}> {

  constructor(props: TInternalProps) {
    super(props);
    this.clearAllNotifications = this.clearAllNotifications.bind(this);
  }

  protected get snackbarTpl(): JSX.Element {
    const {notification} = this.props;
    const message = notification && (notification.error || notification.info);
    return (
        <Snackbar message={message}
                  afterShow={this.clearAllNotifications}>
        </Snackbar>
    );
  }

  private clearAllNotifications(): void {
    this.appStore.dispatch({ type: NOTIFICATION_CLEAR_ACTION_TYPE });
  }
}
