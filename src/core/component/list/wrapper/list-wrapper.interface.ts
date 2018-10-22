import * as React from 'react';

import { IComponentProps } from '../../../props-definitions.interface';
import { IListWrapperEntity } from '../../../entities-definitions.interface';
import { IContentWrapper } from '../../../definitions.interface';

/**
 * @stable [13.10.2018]
 */
export interface IListWrapperProps
  extends IComponentProps,
          IListWrapperEntity,
          IContentWrapper<React.ReactNode[] | React.ReactNode | (() => Array<React.ReactNode[] | React.ReactNode>)> {
}
