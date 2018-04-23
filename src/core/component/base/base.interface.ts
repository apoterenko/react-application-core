import { SyntheticEvent } from 'react';

import {
  AnyT,
  IHtmlElementSelfWrapper,
} from '../../definitions.interface';
import {
  IUniversalContainerEntity,
  IUniversalComponent,
  IUniversalBaseContainer,
} from '../../entities-definitions.interface';

export interface IBaseComponent<TProps = {}, TState = {}>
    extends IUniversalComponent<TProps, TState>,
            IHtmlElementSelfWrapper {
  stopEvent(event: SyntheticEvent<AnyT>): void;
}

export interface IBaseContainer<TInternalProps extends IUniversalContainerEntity,
                                TInternalState>
  extends IUniversalBaseContainer<TInternalProps, TInternalState> {
}
