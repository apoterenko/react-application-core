import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { NOTIFICATION_INFO_ACTION_TYPE } from '../../notification';
import { UniversalContainer } from './universal.container';
import { IUniversalDialog2 } from '../dialog/dialog.interface';
import { IContainerProps, IContainer } from '../../definition';

export class BaseContainer<TProps extends IContainerProps = IContainerProps, TState = {}>
    extends UniversalContainer<TProps, TState>
    implements IContainer<TProps, TState> {

  constructor(props: TProps) {
    super(props);
    this.activateFormDialog = this.activateFormDialog.bind(this);
  }

  // Notification service method (DRY)
  protected dispatchNotification(info: string): void {
    this.dispatchCustomType(NOTIFICATION_INFO_ACTION_TYPE, { info });
  }

  /**
   * @deprecated Use $$formChangesConfirmDispatcherProxy
   */
  protected activateFormDialog(): void {
    (this.refs.formDialog as IUniversalDialog2).activate();
  }
}
