import * as React from 'react';

import { UIIconConfigurationT } from '../../../../configurations-definitions.interface';
import { IComponentProps } from '../../../../props-definitions.interface';

export interface IInfoListItemProps extends IComponentProps {
  graphicContent?: React.ReactNode;
  secondaryTextContent?: React.ReactNode;
  metaIconConfiguration?: UIIconConfigurationT;
}
