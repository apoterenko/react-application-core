import { Component } from 'react';

import {
  AnyT,
  IDispatchWrapper,
  ISectionNameWrapper,
  ITransportWrapper,
} from '../../definitions.interface';
import { ITransportEntity } from '../../entities-definitions.interface';

/* @stable - 12.04.2018 */
export interface IUniversalBaseContainerInternalProps extends ISectionNameWrapper,
                                                              ITransportWrapper<ITransportEntity> {
}

/* @stable - 12.04.2018 */
export interface IUniversalBaseContainer<TInternalProps extends IUniversalBaseContainerInternalProps,
                                         TInternalState>
  extends Component<TInternalProps, TInternalState>,
          ISectionNameWrapper,
          IDispatchWrapper<(type: string, data?: AnyT) => void> {
}
