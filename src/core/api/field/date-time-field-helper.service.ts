import * as R from 'ramda';

import {
  IEntity,
  UNDEF,
  IFromDateFromTimeEntity,
  IToDateToTimeEntity,
  DEFAULT_TIME_FROM,
  DEFAULT_TIME_TO,
  IKeyValue,
  TO_DATE_FIELD_NAME,
  FROM_DATE_FIELD_NAME,
  TO_TIME_FIELD_NAME,
  FROM_TIME_FIELD_NAME,
  DATE_FIELD_NAME,
  TIME_FIELD_NAME,
  IFromDateToDateEntity,
} from '../../definitions.interface';
import { IApiEntity, IDateTimeEntity, IFromDateFromTimeToDateToTimeEntity } from '../../entities-definitions.interface';
import { provideInSingleton, lazyInject, DI_TYPES } from '../../di';
import { IDateConverter } from '../../converter';
import { orUndef, isUndef, isNull, isFn } from '../../util';

@provideInSingleton(DateTimeFieldHelper)
export class DateTimeFieldHelper {
  @lazyInject(DI_TYPES.DateConverter) private dc: IDateConverter;

  /**
   * @stable [25.08.2018]
   * @param {TEntity} changes
   * @param {(entity: TEntity) => string} fromDateResolver
   * @param {(entity: TEntity) => string} toDateResolver
   * @param {number} monthAgo
   * @returns {IFromDateToDateEntity}
   */
  public buildLastPeriodFromChanges<TEntity extends IEntity>(changes: TEntity,
                                                             fromDateResolver: (entity: TEntity) => string,
                                                             toDateResolver: (entity: TEntity) => string,
                                                             monthAgo?: number): IFromDateToDateEntity {
    return this.buildLastPeriod<TEntity>({changes}, fromDateResolver, toDateResolver, monthAgo);
  }

  /**
   * @stable [25.08.2018]
   * @param {IApiEntity<TEntity extends IEntity>} apiEntity
   * @param {(entity: TEntity) => string} fromDateResolver
   * @param {(entity: TEntity) => string} toDateResolver
   * @param {number} monthAgo
   * @returns {IFromDateToDateEntity}
   */
  public buildLastPeriod<TEntity extends IEntity>(apiEntity: IApiEntity<TEntity>,
                                                  fromDateResolver: (entity: TEntity) => string,
                                                  toDateResolver: (entity: TEntity) => string,
                                                  monthAgo = 0): IFromDateToDateEntity {
    const lastDayOfLastMonth = this.dc.getLastDayOfMonth(monthAgo);
    const firstDayOfLastMonth = this.dc.getFirstDayOfMonth(monthAgo);
    const currentDate = this.dc.getCurrentDate();

    return {
      fromDate: this.dc.fromDateTimeToDate(this.toDateTime<TEntity>(apiEntity, fromDateResolver) || firstDayOfLastMonth),
      toDate: this.dc.fromDateTimeToDate(this.toDateTime<TEntity>(apiEntity, toDateResolver) ||
        (lastDayOfLastMonth.getTime() > currentDate.getTime() ? currentDate : lastDayOfLastMonth)),
    };
  }

  // TODO duplication
  public buildLastDateTimePeriod<TEntity extends IEntity>(apiEntity: IApiEntity<TEntity>,
                                                          fromDateResolver: (entity: TEntity) => string,
                                                          toDateResolver: (entity: TEntity) => string,
                                                          monthAgo = 0): IFromDateFromTimeToDateToTimeEntity {
    const lastDayOfLastMonth = this.dc.getLastDayOfMonth(monthAgo);
    const firstDayOfLastMonth = this.dc.getFirstDayOfMonth(monthAgo);
    const currentDate = this.dc.getCurrentDate();

    return {
      fromDate: this.dc.formatDateTimeFromDateTime(this.toDateTime<TEntity>(apiEntity, fromDateResolver) || firstDayOfLastMonth),
      toDate: this.dc.formatDateTimeFromDateTime(this.toDateTime<TEntity>(apiEntity, toDateResolver) ||
        (lastDayOfLastMonth.getTime() > currentDate.getTime() ? currentDate : lastDayOfLastMonth)),
    };
  }

  public buildLastDateTimePeriodFromChanges<TEntity extends IEntity>(changes: TEntity,
                                                                     fromDateResolver: (entity: TEntity) => string,
                                                                     toDateResolver: (entity: TEntity) => string,
                                                                     monthAgo?: number): IFromDateToDateEntity {
    return this.buildLastDateTimePeriod<TEntity>({changes}, fromDateResolver, toDateResolver, monthAgo);
  }

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

  public buildDateTimeSinceField<TEntity extends IFromDateFromTimeEntity>(apiEntity: IApiEntity<TEntity>,
                                                                          returnOriginalValueIfNoChanges = false): string {
    return this.toDateTime<TEntity>(
      apiEntity,
      (source) => source.fromDate,
      (source) => source.fromTime,
      returnOriginalValueIfNoChanges,
      DEFAULT_TIME_FROM
    );
  }

  public buildDateTimeTillField<TEntity extends IToDateToTimeEntity>(apiEntity: IApiEntity<TEntity>,
                                                                     returnOriginalValueIfNoChanges = false): string {
    return this.toDateTime<TEntity>(
      apiEntity,
      (source) => source.toDate,
      (source) => source.toTime,
      returnOriginalValueIfNoChanges,
      DEFAULT_TIME_TO
    );
  }

  public joinDateTimeFields<TEntity extends IFromDateFromTimeToDateToTimeEntity>(
    apiEntity: IApiEntity<TEntity>,
    returnOriginalValueIfNoChanges = false): IFromDateFromTimeToDateToTimeEntity {
    return {
      ...this.composeDateTimeSinceField(apiEntity, returnOriginalValueIfNoChanges),
      ...this.composeDateTimeTillField(apiEntity, returnOriginalValueIfNoChanges),
    };
  }

  public composeDateTimeSinceField<TEntity extends IFromDateFromTimeEntity>(
    apiEntity: IApiEntity<TEntity>,
    returnOriginalValueIfNoChanges = false): IFromDateFromTimeEntity {
    return {
      fromDate: this.buildDateTimeSinceField(apiEntity, returnOriginalValueIfNoChanges),
    };
  }

  public composeDateTimeTillField<TEntity extends IToDateToTimeEntity>(
    apiEntity: IApiEntity<TEntity>,
    returnOriginalValueIfNoChanges = false): IToDateToTimeEntity {
    return {
      toDate: this.buildDateTimeTillField(apiEntity, returnOriginalValueIfNoChanges),
    };
  }

  /**
   * @stable [02.06.2018]
   * @param {TEntity} entity
   * @param {Date} defaultFromDate
   * @param {Date} defaultToDate
   * @returns {IFromDateToDateEntity}
   */
  public composeDateTimeRangeFields<TEntity extends IFromDateFromTimeToDateToTimeEntity>(
      entity: TEntity,
      defaultFromDate: Date = this.dc.get30DaysAgo(),
      defaultToDate: Date = this.dc.getCurrentDate()): IFromDateToDateEntity {
    return this.buildDateTimeRangeFields<TEntity>(
      entity,
      (source) => source.fromDate,
      (source) => source.toDate,
      (source) => source.fromTime,
      (source) => source.toTime,
      FROM_DATE_FIELD_NAME,
      TO_DATE_FIELD_NAME,
      defaultFromDate,
      defaultToDate
    );
  }

  public buildDateTimeRangeFields<TEntity extends IEntity>(entity: TEntity,
                                                           fromDateResolver: (entity: TEntity) => string,
                                                           toDateResolver: (entity: TEntity) => string,
                                                           fromTimeResolver: (entity: TEntity) => string,
                                                           toTimeResolver: (entity: TEntity) => string,
                                                           fromDateFieldName: string,
                                                           toDateFieldName: string,
                                                           defaultFromDate: Date,
                                                           defaultToDate: Date): TEntity {
    return {
      [fromDateFieldName]: this.dc.fromStartUiDateTimeToDateTime(
        fromDateResolver(entity) || this.dc.fromDateToUiDate(defaultFromDate),
        fromTimeResolver(entity)
      ),
      [toDateFieldName]: this.dc.fromEndUiDateTimeToDateTime(
        toDateResolver(entity) || this.dc.fromDateToUiDate(defaultToDate),
        toTimeResolver(entity)
      ),
    } as TEntity;
  }

  public splitToDateTimeRangeFields(entity: IFromDateFromTimeToDateToTimeEntity): IFromDateFromTimeToDateToTimeEntity {
    return {
      ...this.splitToDateTimeSinceFields(entity),
      ...this.splitToDateTimeTillFields(entity),
    };
  }

  public splitToDateTimeSinceFields(entity: IFromDateFromTimeEntity): IFromDateFromTimeEntity {
    return this.splitToDateTimeFields<IFromDateFromTimeEntity>(
      entity,
      FROM_DATE_FIELD_NAME,
      FROM_TIME_FIELD_NAME,
      (source) => source.fromDate
    );
  }

  public splitToDateTimeTillFields(entity: IToDateToTimeEntity): IToDateToTimeEntity {
    return this.splitToDateTimeFields<IToDateToTimeEntity>(
      entity,
      TO_DATE_FIELD_NAME,
      TO_TIME_FIELD_NAME,
      (source) => source.toDate
    );
  }

  public splitToDateTimeBasicFields(entity: IDateTimeEntity): IDateTimeEntity {
    return this.splitToDateAndTimeBasicFields<IDateTimeEntity>(entity, (source) => source.date);
  }

  public splitToDateAndTimeBasicFields<TEntity>(entity: IDateTimeEntity,
                                                dateResolver: (entity: TEntity) => string): IDateTimeEntity {
    return this.splitToDateTimeFields<IDateTimeEntity>(
      entity,
      DATE_FIELD_NAME,
      TIME_FIELD_NAME,
      dateResolver
    );
  }

  /**
   * @deprecated
   */
  public splitToDateTimeFields<TEntity>(entity: TEntity,
                                        dateFieldName: string,
                                        timeFieldName: string,
                                        dateResolver: (entity: TEntity) => string): IKeyValue {
    const date = dateResolver(entity);

    return {
      [timeFieldName]: orUndef(date, () => this.dc.fromDateTimeToTime(date)),
      [dateFieldName]: orUndef(date, () => this.dc.fromDateTimeToDate(date)),
    };
  }

  public toDateTime<TEntity extends IEntity>(apiEntity: IApiEntity<TEntity>,
                                             dateResolver: (entity: TEntity) => string,
                                             timeResolver?: (entity: TEntity) => string,
                                             returnOriginalValueIfNoChanges = false,
                                             defaultTime?: string): string {
    let returnedDate;
    let returnedTime;

    const entityChanges = apiEntity.changes;
    const entity = apiEntity.entity;

    const changedDate = dateResolver(entityChanges);
    const changedTime = orUndef<string>(isFn(timeResolver), () => timeResolver(entityChanges));

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
    const originalTime = entity && (orUndef<string>(isFn(timeResolver), () => timeResolver(entity)));

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
