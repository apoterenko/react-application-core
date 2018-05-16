import { UniversalContainer } from './universal.container';
import { IRnBaseContainerProps } from './rn-base.interface';

export class RnBaseContainer<TInternalProps extends IRnBaseContainerProps>
  extends UniversalContainer<TInternalProps> {
}
