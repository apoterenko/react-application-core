import { IEntity, EntityIdT, UNDEF } from '../../../definition.interface';
import { orUndef } from '../../../util';
import { IMultiEntity, MultiFieldEntityT } from './multifield.interface';

export function toActualEntities(multiFieldValue: MultiFieldEntityT<IEntity>): IEntity[] {
  if (!multiFieldValue) {
    return UNDEF;
  }
  const multiEntity = multiFieldValue as IMultiEntity;
  if (Array.isArray(multiFieldValue)) {
    return multiFieldValue as IEntity[];
  }
  return multiEntity.add.concat(
    (multiEntity.source || [])
      .filter((entity) => !multiEntity.remove.find((removeId) => removeId.id === entity.id))
  );
}

export function toEntityIds(multiFieldValue: MultiFieldEntityT<IEntity>): EntityIdT[] {
  const result = toActualEntities(multiFieldValue);
  return orUndef(result, () => result.map((entity) => entity.id));
}
