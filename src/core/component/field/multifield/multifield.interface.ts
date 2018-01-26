import { IEntity } from '../../../definition.interface';

export interface IMultiEntity {
  add: IEntity[];
  remove: IEntity[];
  source?: IEntity[];
}

export type MultiFieldEntityT<TEntity extends IEntity> = TEntity[] | IMultiEntity;
