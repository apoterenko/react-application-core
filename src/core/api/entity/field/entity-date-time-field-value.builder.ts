import {
  IEntity,
  UNDEF,
  IFromDateTimeEntity,
  IToDateTimeEntity,
  DEFAULT_TIME_FROM,
  DEFAULT_TIME_TO,
} from '../../../definition.interface';
import { IApiEntity } from '../../api.interface';
import { provideInSingleton, lazyInject, DI_TYPES } from '../../../di';
import { IDateConverter } from '../../../converter';
import { orUndef } from '../../../util';

@provideInSingleton(EntityDateTimeFieldValueBuilder)
export class EntityDateTimeFieldValueBuilder {

  @lazyInject(DI_TYPES.DateConverter) private dc: IDateConverter;

  public build<TEntity extends IEntity>(apiEntity: IApiEntity<TEntity>,
                                        dateResolver: (entity: TEntity) => string,
                                        timeResolver: (entity: TEntity) => string,
                                        defaultTime?: string): string {
    const entityChanges = apiEntity.changes;
    const date = dateResolver(entityChanges);
    const time = timeResolver(entityChanges);

    if (!date && !time) {
      // The are no changes at all
      return UNDEF;
    }
    const entity = apiEntity.entity;

    return apiEntity.isNew
        ? this.dc.fromUiDateTimeToDateTime(
            date,
            time || defaultTime
        )
        : this.dc.fromUiDateTimeToDateTime(
            date || dateResolver(entity),
            time || timeResolver(entity) || defaultTime
        );
  }

  public composeDateTimeSinceField<TEntity extends IFromDateTimeEntity>(apiEntity: IApiEntity<TEntity>): IFromDateTimeEntity {
    return {
      fromDate: this.build<TEntity>(
        apiEntity,
        (source) => source.fromDate,
        (source) => source.fromTime,
        DEFAULT_TIME_FROM
      ),
    };
  }

  public composeDateTimeTillField<TEntity extends IToDateTimeEntity>(apiEntity: IApiEntity<TEntity>): IToDateTimeEntity {
    return {
      toDate: this.build<TEntity>(
        apiEntity,
        (source) => source.toDate,
        (source) => source.toTime,
        DEFAULT_TIME_TO
      ),
    };
  }

  public splitToDateTimeSinceFields(entity: IFromDateTimeEntity): IFromDateTimeEntity {
    return {
      fromTime: orUndef(entity.fromDate, () => this.dc.formatTimeFromDateTime(entity.fromDate)),
      fromDate: orUndef(entity.fromDate, () => this.dc.formatDateFromDateTime(entity.fromDate)),
    };
  }

  public splitToDateTimeTillFields(entity: IToDateTimeEntity): IToDateTimeEntity {
    return {
      toTime: orUndef(entity.toDate, () => this.dc.formatTimeFromDateTime(entity.toDate)),
      toDate: orUndef(entity.toDate, () => this.dc.formatDateFromDateTime(entity.toDate)),
    };
  }
}
