import { IEntity, INamedEntity } from '../../../definition.interface';
import { IBasicMultiFieldPlugin } from './basic-multifield.interface';

export interface IMultiFieldPlugin extends IBasicMultiFieldPlugin {
}

export interface IMultiEntity {
  add: IEntity[];
  remove: IEntity[];
  source?: IEntity[];
}

export type MultiFieldEntityT<TEntity extends IEntity> = TEntity[] | IMultiEntity;
