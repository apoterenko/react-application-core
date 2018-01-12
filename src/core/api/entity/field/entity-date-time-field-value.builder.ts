import { IEntity, UNDEF } from '../../../definition.interface';
import { IApiEntity } from '../../api.interface';
import { provideInSingleton, lazyInject, DI_TYPES } from '../../../di';
import { IDateConverter } from '../../../converter';

@provideInSingleton(EntityDateTimeFieldValueBuilder)
export class EntityDateTimeFieldValueBuilder {

  @lazyInject(DI_TYPES.DateConverter) private dc: IDateConverter;

  public build<TEntity extends IEntity>(apiEntity: IApiEntity<TEntity>,
                                        dateResolver: (entity: TEntity) => string,
                                        timeResolver: (entity: TEntity) => string,
                                        defaultTime?: string): string {
    const entityChanges = apiEntity.changes;

    if (!entityChanges.date && !entityChanges.time) {
      // The are no changes at all
      return UNDEF;
    }
    const entity = apiEntity.entity;

    return apiEntity.isNew
        ? this.dc.fromUiDateTimeToDateTime(
            dateResolver(entityChanges),
            timeResolver(entityChanges) || defaultTime
        )
        : this.dc.fromUiDateTimeToDateTime(
            dateResolver(entityChanges) || dateResolver(entity),
            timeResolver(entityChanges) || timeResolver(entity) || defaultTime
        );
  }
}
