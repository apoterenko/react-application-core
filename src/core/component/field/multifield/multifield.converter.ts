import { IEntity, EntityIdT, UNDEF } from '../../../definition.interface';
import { IMultiEntity } from './multifield.interface';

export function toEntityIds(multiFieldValue: IMultiEntity | IEntity[]): EntityIdT[] {
  if (!multiFieldValue) {
    return UNDEF;
  }
  const multiFieldAttributes = multiFieldValue as IMultiEntity;
  return (
      Array.isArray(multiFieldValue)
          ? multiFieldValue as IEntity[]
          : multiFieldAttributes && multiFieldAttributes.add
              .concat(
                  (multiFieldAttributes.source || [])
                      .filter((entity) => !multiFieldAttributes.remove
                          .find((removeId) => removeId.id === entity.id))
              )
  ).map((entity) => entity.id);
}
