import {
  IContainerProps,
  IContainer,
} from '../../definition';
import { UniversalContainer } from './universal.container';

export class BaseContainer<TProps extends IContainerProps = IContainerProps, TState = {}, TAccessConfig = {}>
    extends UniversalContainer<TProps, TState, TAccessConfig>
    implements IContainer<TProps, TState> {
}
