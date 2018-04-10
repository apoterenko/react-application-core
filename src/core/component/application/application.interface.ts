import { Component } from 'react';

import {
  IStringProgressMessageWrapper,
  IStringEmptyMessageWrapper,
} from '../../definitions.interface';
import { IBaseContainerInternalProps, IContainerInternalProps } from '../../component/base';
import { ConnectorConfigT } from '../../component/connector';
import { IApplicationEntity } from '../../entities-definitions.interface';

export interface IApplicationContainerProps extends IBaseContainerInternalProps,
                                                    IApplicationEntity,
                                                    IStringEmptyMessageWrapper,
                                                    IStringProgressMessageWrapper {
  basename?: string;
}

export interface IContainerWrapperCtor {
  new(...args): Component<IContainerInternalProps, {}>;
}

export const APPLICATION_SECTIONS: Map<string, ConnectorConfigT> = new Map<string, ConnectorConfigT>();
