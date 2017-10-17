import { PureComponent } from 'react';

import { IBaseContainerInternalProps, IContainerInternalProps } from '../../component/base';
import { IApplicationAttributes } from '../../application';

export interface IApplicationContainerProps extends IBaseContainerInternalProps,
                                                    IApplicationAttributes {
  basename?: string;
}

export interface IContainerWrapperCtor {
  new(...args): PureComponent<IContainerInternalProps, {}>;
}
