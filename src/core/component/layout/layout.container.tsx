import * as React from 'react';

import { Snackbar } from '../../component/snackbar';
import { BaseContainer } from '../../component/base';
import { NOTIFICATION_CLEAR_ACTION_TYPE } from '../../notification';
import { IContainerEntity } from '../../entities-definitions.interface';

export class LayoutContainer<TInternalProps extends IContainerEntity>
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
                  info={!!notification.info}
                  afterShow={this.clearAllNotifications}>
        </Snackbar>
    );
  }

  private clearAllNotifications(): void {
    this.appStore.dispatch({ type: NOTIFICATION_CLEAR_ACTION_TYPE });
  }
}
