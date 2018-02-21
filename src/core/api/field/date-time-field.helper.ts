import * as R from 'ramda';

import {
  IEntity,
  UNDEF,
  IFromDateTimeEntity,
  IToDateTimeEntity,
  DEFAULT_TIME_FROM,
  DEFAULT_TIME_TO,
  IKeyValue,
  TO_DATE_FIELD_NAME,
  FROM_DATE_FIELD_NAME,
  TO_TIME_FIELD_NAME,
  FROM_TIME_FIELD_NAME,
  IDateTimeEntity,
  DATE_FIELD_NAME,
  TIME_FIELD_NAME,
  IFromToDateEntity,
  IFromToDateTimeEntity,
} from '../../definition.interface';

import { IApiEntity } from '../api.interface';
import { provideInSingleton, lazyInject, DI_TYPES } from '../../di';
import { IDateConverter } from '../../converter';
import { orUndef, isUndef, isNull } from '../../util';

@provideInSingleton(DateTimeFieldHelper)
export class DateTimeFieldHelper {
  @lazyInject(DI_TYPES.DateConverter) private dc: IDateConverter;

  public buildDateTimeFromField<TEntity extends IDateTimeEntity>(apiEntity: IApiEntity<TEntity>,
                                                                 returnOriginalValueIfNoChanges = false): string {
    return this.toDateTime<TEntity>(
      apiEntity,
      (source) => source.date,
      (source) => source.time,
      returnOriginalValueIfNoChanges,
      DEFAULT_TIME_FROM
    );
  }

  public buildDateTimeToField<TEntity extends IDateTimeEntity>(apiEntity: IApiEntity<TEntity>,
                                                               returnOriginalValueIfNoChanges = false): string {
    return this.toDateTime<TEntity>(
      apiEntity,
      (source) => source.date,
      (source) => source.time,
      returnOriginalValueIfNoChanges,
      DEFAULT_TIME_TO
    );
  }

  public buildDateTimeSinceField<TEntity extends IFromDateTimeEntity>(apiEntity: IApiEntity<TEntity>,
                                                                      returnOriginalValueIfNoChanges = false): string {
    return this.toDateTime<TEntity>(
      apiEntity,
      (source) => source.fromDate,
      (source) => source.fromTime,
      returnOriginalValueIfNoChanges,
      DEFAULT_TIME_FROM
    );
  }

  public buildDateTimeTillField<TEntity extends IToDateTimeEntity>(apiEntity: IApiEntity<TEntity>,
                                                                   returnOriginalValueIfNoChanges = false): string {
    return this.toDateTime<TEntity>(
      apiEntity,
      (source) => source.toDate,
      (source) => source.toTime,
      returnOriginalValueIfNoChanges,
      DEFAULT_TIME_TO
    );
  }

  public composeDateTimeSinceField<TEntity extends IFromDateTimeEntity>(
    apiEntity: IApiEntity<TEntity>,
    returnOriginalValueIfNoChanges = false): IFromDateTimeEntity {
    return {
      fromDate: this.buildDateTimeSinceField(apiEntity, returnOriginalValueIfNoChanges),
    };
  }

  public composeDateTimeTillField<TEntity extends IToDateTimeEntity>(
    apiEntity: IApiEntity<TEntity>,
    returnOriginalValueIfNoChanges = false): IToDateTimeEntity {
    return {
      toDate: this.buildDateTimeTillField(apiEntity, returnOriginalValueIfNoChanges),
    };
  }

  public composeDateTimeRangeFields<TEntity extends IFromToDateTimeEntity>(entity: TEntity): IFromToDateEntity {
    return {
      fromDate: this.dc.fromStartUiDateTimeToDateTime(
        entity.fromDate || this.dc.fromDateToUiDate(this.dc.get30DaysAgo()),
        entity.fromTime
      ),
      toDate: this.dc.fromEndUiDateTimeToDateTime(
        entity.toDate || this.dc.fromDateToUiDate(this.dc.getStartOfCurrentDay()),
        entity.toTime
      ),
    };
  }

  public splitToDateTimeSinceFields(entity: IFromDateTimeEntity): IFromDateTimeEntity {
    return this.splitToDateTimeFields<IFromDateTimeEntity>(
      entity,
      FROM_DATE_FIELD_NAME,
      FROM_TIME_FIELD_NAME,
      (source) => source.fromDate
    );
  }

  public splitToDateTimeTillFields(entity: IToDateTimeEntity): IToDateTimeEntity {
    return this.splitToDateTimeFields<IToDateTimeEntity>(
      entity,
      TO_DATE_FIELD_NAME,
      TO_TIME_FIELD_NAME,
      (source) => source.toDate
    );
  }

  public splitToDateTimeBasicFields(entity: IDateTimeEntity): IDateTimeEntity {
    return this.splitToDateTimeFields<IDateTimeEntity>(
      entity,
      DATE_FIELD_NAME,
      TIME_FIELD_NAME,
      (source) => source.date
    );
  }

  public splitToDateTimeFields<TEntity>(entity: TEntity,
                                        dateFieldName: string,
                                        timeFieldName: string,
                                        dateResolver: (entity: TEntity) => string): IKeyValue {
    const date = dateResolver(entity);

    return {
      [timeFieldName]: orUndef(date, () => this.dc.formatTimeFromDateTime(date)),
      [dateFieldName]: orUndef(date, () => this.dc.formatDateFromDateTime(date)),
    };
  }

  public toDateTime<TEntity extends IEntity>(apiEntity: IApiEntity<TEntity>,
                                             dateResolver: (entity: TEntity) => string,
                                             timeResolver: (entity: TEntity) => string,
                                             returnOriginalValueIfNoChanges = false,
                                             defaultTime?: string): string {
    let returnedDate;
    let returnedTime;

    const entityChanges = apiEntity.changes;
    const entity = apiEntity.entity;

    const changedDate = dateResolver(entityChanges);
    const changedTime = timeResolver(entityChanges);

    if (isUndef(changedDate) && isUndef(changedTime) && !returnOriginalValueIfNoChanges) {
      // The are no changes at all and we don't want to return the original value
      return UNDEF;
    }
    if (isNull(changedDate)) {
      // Reset a date => send null to the server
      return null;
    }
    returnedDate = changedDate;
    returnedTime = changedTime;

    const originalDate = entity && dateResolver(entity);
    const originalTime = entity && timeResolver(entity);

    if (isNull(changedTime)) {
      // Reset a time
      if (R.isNil(defaultTime)) {
        // But default time is not provided
        returnedTime = originalTime;
      } else {
        returnedTime = defaultTime;
      }
    } else {
      returnedTime = changedTime || originalTime || defaultTime;
    }
    return this.dc.fromUiDateTimeToDateTime(returnedDate || originalDate, returnedTime);
  }
}
