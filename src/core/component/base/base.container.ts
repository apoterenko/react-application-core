import {
  IContainerProps,
  IContainer,
  $RAC_NOTIFICATION_INFO_ACTION_TYPE,
} from '../../definition';
import { UniversalContainer } from './universal.container';

export class BaseContainer<TProps extends IContainerProps = IContainerProps, TState = {}, TAccessConfig = {}>
    extends UniversalContainer<TProps, TState, TAccessConfig>
    implements IContainer<TProps, TState> {

  // TODO
  protected dispatchNotification(info: string): void {
    this.dispatchCustomType($RAC_NOTIFICATION_INFO_ACTION_TYPE, { info });
  }
}
