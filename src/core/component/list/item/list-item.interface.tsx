import { IRippleInternalProps } from '../../../component/ripple';
import { IEntity, IRenderable } from '../../../definition.interface';

export interface IListItemInternalProps extends IRippleInternalProps, IRenderable {
  rawData: IEntity;
  actionType?: string;
  onClick?(entity: IEntity): void;
}
