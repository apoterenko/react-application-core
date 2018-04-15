import { UniversalBaseContainer } from './universal-base.container';
import { IRnBaseContainerProps } from './rn-base.interface';

export class RnBaseContainer<TInternalProps extends IRnBaseContainerProps,
                             TInternalState>
  extends UniversalBaseContainer<TInternalProps, TInternalState> {
}
