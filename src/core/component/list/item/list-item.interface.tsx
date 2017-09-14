import { IRippleInternalProps } from 'core/component/ripple';
import { IEntity, IRenderable } from 'core/definition.interface';

export interface IListItemInternalProps extends IRippleInternalProps, IRenderable {
  rawData: IEntity;
  actionType?: string;
  onClick?(entity: IEntity): void;
}
