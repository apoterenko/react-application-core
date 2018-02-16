import { ReactNode } from 'react';

import { IRippleInternalProps } from '../../../component/ripple';
import { IEntity, IRendererWrapper, IIconWrapper } from '../../../definition.interface';

export interface IListItemOptions extends IRendererWrapper<IEntity>,
                                          IIconWrapper {
  tpl?(entity: IEntity): ReactNode;
  toClassName?(data: IEntity): string;
}

export interface IListItemInternalProps extends IRippleInternalProps,
                                                IListItemOptions {
  rawData?: IEntity;
  onClick?(entity: IEntity): void;
}
