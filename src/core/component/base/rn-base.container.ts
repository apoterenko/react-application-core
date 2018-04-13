import { Store } from 'redux';

import { UniversalBaseContainer } from './universal-base.container';
import { DI_TYPES, staticInjector } from '../../di';
import { IUniversalBaseContainerInternalProps } from './universal-base.interface';

export class RnBaseContainer<TInternalProps extends IUniversalBaseContainerInternalProps, TInternalState>
  extends UniversalBaseContainer<TInternalProps, TInternalState> {

  protected get appStore(): Store<{}> {
    return staticInjector(DI_TYPES.Store);
  }
}
