import * as React from 'react';

import { IBaseComponentInternalProps } from '../../../../component/base';

export interface IInfoListItemInternalProps extends IBaseComponentInternalProps {
  graphicContent?: React.ReactNode;
  secondaryTextContent?: React.ReactNode;
}
