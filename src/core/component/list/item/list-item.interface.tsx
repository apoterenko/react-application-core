import { IRippleInternalProps } from '../../../component/ripple';
import { IEntity, IRenderable } from '../../../definition.interface';

export interface IListItemOptions extends IRenderable {
  itemIcon?: string;
  itemValue?(entity: IEntity): string;
}

export interface IListItemInternalProps extends IRippleInternalProps,
                                                IListItemOptions {
  rawData: IEntity;
  onClick?(entity: IEntity): void;
}
