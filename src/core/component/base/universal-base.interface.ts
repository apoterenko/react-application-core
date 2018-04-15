import { Component } from 'react';

import {
  AnyT,
  IDispatchWrapper,
  ISectionNameWrapper,
} from '../../definitions.interface';
import { IUniversalContainerEntity } from '../../entities-definitions.interface';

/* @stable - 12.04.2018 */
export interface IUniversalBaseContainer<TInternalProps extends IUniversalContainerEntity,
                                         TInternalState>
  extends Component<TInternalProps, TInternalState>,
          ISectionNameWrapper,
          IDispatchWrapper<(type: string, data?: AnyT) => void> {
}
