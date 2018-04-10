import { Component } from 'react';

import { IBaseContainerInternalProps, IContainerInternalProps } from '../../component/base';
import { ConnectorConfigT } from '../../component/connector';
import { IApplicationEntity } from '../../entities-definitions.interface';
import { IApplicationConfiguration } from '../../configurations-definitions.interface';

/* @stable - 11.04.2018 */
export interface IApplicationContainerProps extends IBaseContainerInternalProps,
                                                    IApplicationConfiguration,
                                                    IApplicationEntity {
}

export interface IContainerWrapperCtor {
  new(...args): Component<IContainerInternalProps, {}>;
}

export const APPLICATION_SECTIONS: Map<string, ConnectorConfigT> = new Map<string, ConnectorConfigT>();
