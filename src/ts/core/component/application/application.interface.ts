import { PureComponent } from 'react';

import { IBaseContainerInternalProps, IBaseContainerInternalState } from 'core/component/base';

export interface IApplicationContainerProps extends IBaseContainerInternalProps {
  basename: string;
}

export interface IContainerWrapperCtor<TWrappedContainer extends PureComponent<TInternalProps, TInternalState>,
                                       TInternalProps extends IBaseContainerInternalProps,
                                       TInternalState extends IBaseContainerInternalState> {
  WrappedComponent?: TWrappedContainer;
  new (...args): TWrappedContainer;
}
