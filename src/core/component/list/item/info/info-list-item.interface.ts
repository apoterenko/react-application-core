import * as React from 'react';

import { UIIconConfigT } from '../../../../component/factory';
import { IBaseComponentInternalProps } from '../../../../component/base';

export interface IInfoListItemInternalProps extends IBaseComponentInternalProps {
  graphicContent?: React.ReactNode;
  secondaryTextContent?: React.ReactNode;
  metaIconConfig?: UIIconConfigT;
}
