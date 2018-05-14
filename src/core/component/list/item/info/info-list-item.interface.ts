import * as React from 'react';

import { UIIconConfigT } from '../../../../component/factory';
import { IComponentProps } from '../../../../props-definitions.interface';

export interface IInfoListItemProps extends IComponentProps {
  graphicContent?: React.ReactNode;
  secondaryTextContent?: React.ReactNode;
  metaIconConfig?: UIIconConfigT;
}
