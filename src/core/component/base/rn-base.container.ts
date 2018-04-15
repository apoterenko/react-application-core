import { Store } from 'redux';

import { UniversalBaseContainer } from './universal-base.container';
import { DI_TYPES, staticInjector } from '../../di';
import { IRnBaseContainerProps } from './rn-base.interface';

export class RnBaseContainer<TInternalProps extends IRnBaseContainerProps,
                             TInternalState>
  extends UniversalBaseContainer<TInternalProps, TInternalState> {

  protected get appStore(): Store<{}> {
    return staticInjector(DI_TYPES.Store);
  }
}
