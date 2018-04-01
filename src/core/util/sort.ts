import { IEntity } from '../definitions.interface';

export const ID_DESC_ENTITIES_SORTER_FN = <TEntity extends IEntity>(item1: TEntity, item2: TEntity): number =>
  parseInt(item1.id as string, 10) > parseInt(item2.id as string, 10) ? -1 : 1;

export const ID_ASC_ENTITIES_SORTER_FN = <TEntity extends IEntity>(item1: TEntity, item2: TEntity): number =>
  ID_DESC_ENTITIES_SORTER_FN(item1, item2) * -1;
