import {
  IContainerProps,
} from '../../definition';
import { GenericContainer } from './generic.container';

/**
 * TODO
 * @deprecated
 */
export class BasicContainer<TProps extends IContainerProps = IContainerProps,
  TState = {}>
  extends GenericContainer<TProps, TState> {
}
