import { Component } from 'react';

import {
  AnyT,
  IDispatchWrapper,
  ISectionNameWrapper,
} from '../../definitions.interface';
import { IUniversalContainerEntity, IUniversalComponentEntity } from '../../entities-definitions.interface';

/* @stable - 12.04.2018 */
export interface IUniversalBaseContainer<TProps extends IUniversalContainerEntity,
                                         TState = {}>
  extends Component<TProps, TState>,
          ISectionNameWrapper,
          IDispatchWrapper<(type: string, data?: AnyT) => void> {
}

/* @stable - 19.04.2018 */
export interface IUniversalBaseComponent<TProps extends IUniversalComponentEntity,
                                         TState = {}>
  extends Component<TProps, TState> {
}
