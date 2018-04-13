import { Store } from 'redux';

import { UniversalBaseContainer } from './universal-base.container';
import { DI_TYPES, staticInjector } from '../../di';
import { IRnBaseContainerInternalProps } from './rn-base.interface';

export class RnBaseContainer<TInternalProps extends IRnBaseContainerInternalProps,
                             TInternalState>
  extends UniversalBaseContainer<TInternalProps, TInternalState> {

  protected get appStore(): Store<{}> {
    return staticInjector(DI_TYPES.Store);
  }
}
