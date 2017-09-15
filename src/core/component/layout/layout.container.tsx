import * as React from 'react';

import { Snackbar } from 'core/component/snackbar';
import { BaseContainer, IBaseContainerInternalProps } from 'core/component/base';

export class LayoutContainer<TInternalProps extends IBaseContainerInternalProps>
    extends BaseContainer<TInternalProps, {}> {

  protected get snackbarTpl(): JSX.Element {
    const {notification} = this.props;
    const message = notification && (notification.error || notification.info);
    return (
        <Snackbar message={message}
                  afterShow={this.clearAllNotifications}>
        </Snackbar>
    );
  }
}
