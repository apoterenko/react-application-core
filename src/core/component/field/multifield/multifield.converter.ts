import { IEntity, EntityIdT, UNDEF } from '../../../definitions.interface';
import { orUndef, isPrimitive, orDefault, isDef } from '../../../util';
import { IMultiEntity, MultiFieldEntityT, MultiFieldValueT, NotMultiFieldEntityT } from './multifield.interface';

export function toActualEntities(entity: MultiFieldEntityT<IEntity>): IEntity[] {
  if (!entity) {
    return UNDEF;
  }
  const multiEntity = entity as IMultiEntity;
  if (!isNotMultiEntity(entity)) {
    return multiEntity.add.concat(
      (multiEntity.source || [])
        .filter((entity0) => !multiEntity.remove.find((removeId) => removeId.id === entity0.id))
    );
  }
  return entity as IEntity[];
}

export function toEntityIds(multiFieldValue: MultiFieldEntityT<IEntity>): EntityIdT[] {
  const result = toActualEntities(multiFieldValue);
  return orUndef<EntityIdT[]>(result, () => result.map<EntityIdT>((entity) => entity.id));
}

export function toActualEntitiesLength(value: MultiFieldValueT<IEntity>): number {
  return orDefault<number, number>(
    isDef(value),
    () => (
      (isNotMultiEntity(value)
        ? normalizeEntities(value as NotMultiFieldEntityT<IEntity>)
        : toActualEntities(value as IMultiEntity)).length
    ),
    0
  );
}

export function normalizeEntities(value: NotMultiFieldEntityT<IEntity>): IEntity[] {
  return isPrimitive(value) ? [{ id: value as EntityIdT }] : value as IEntity[];
}

export function isNotMultiEntity(value: MultiFieldValueT<IEntity>): boolean {
  return Array.isArray(value) || isPrimitive(value);
}
