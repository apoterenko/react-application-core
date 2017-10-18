import { IRippleInternalProps } from '../../../component/ripple';
import { IEntity, IRenderable } from '../../../definition.interface';

export interface IListItemOptions extends IRenderable {
}

export interface IListItemInternalProps extends IRippleInternalProps,
                                                IListItemOptions {
  rawData: IEntity;
  actionType?: string;
  onClick?(entity: IEntity): void;
}
