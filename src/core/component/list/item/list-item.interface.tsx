import { ReactNode } from 'react';

import { IRippleInternalProps } from '../../../component/ripple';
import { IEntity, IRenderable, IIconable } from '../../../definition.interface';

export interface IListItemOptions extends IRenderable,
                                          IIconable {
  tpl?(entity: IEntity): ReactNode;
  toClassName?(data: IEntity): string;
}

export interface IListItemInternalProps extends IRippleInternalProps,
                                                IListItemOptions {
  rawData?: IEntity;
  onClick?(entity: IEntity): void;
}
