import { IContainerProps, IContainer } from '../../definition';
import { NOTIFICATION_INFO_ACTION_TYPE } from '../../notification';
import { UniversalContainer } from './universal.container';

export class BaseContainer<TProps extends IContainerProps = IContainerProps, TState = {}, TAccessConfig = {}>
    extends UniversalContainer<TProps, TState, TAccessConfig>
    implements IContainer<TProps, TState> {

  // Notification service method (DRY)
  protected dispatchNotification(info: string): void {
    this.dispatchCustomType(NOTIFICATION_INFO_ACTION_TYPE, { info });
  }
}
