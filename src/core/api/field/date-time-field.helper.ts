import * as R from 'ramda';

import {
  IEntity,
  UNDEF,
  IFromDateTimeEntity,
  IToDateTimeEntity,
  DEFAULT_TIME_FROM,
  DEFAULT_TIME_TO,
} from '../../definition.interface';

import { IApiEntity } from '../api.interface';
import { provideInSingleton, lazyInject, DI_TYPES } from '../../di';
import { IDateConverter } from '../../converter';
import { orUndef, isUndef, isNull } from '../../util';

@provideInSingleton(DateTimeFieldHelper)
export class DateTimeFieldHelper {

  @lazyInject(DI_TYPES.DateConverter) private dc: IDateConverter;

  public composeDateTimeSinceField<TEntity extends IFromDateTimeEntity>(
    apiEntity: IApiEntity<TEntity>,
    returnOriginalValueIfNoChanges = false): IFromDateTimeEntity {
    return {
      fromDate: this.toDateTime<TEntity>(
        apiEntity,
        (source) => source.fromDate,
        (source) => source.fromTime,
        returnOriginalValueIfNoChanges,
        DEFAULT_TIME_FROM
      ),
    };
  }

  public composeDateTimeTillField<TEntity extends IToDateTimeEntity>(
    apiEntity: IApiEntity<TEntity>,
    returnOriginalValueIfNoChanges = false): IToDateTimeEntity {
    return {
      toDate: this.toDateTime<TEntity>(
        apiEntity,
        (source) => source.toDate,
        (source) => source.toTime,
        returnOriginalValueIfNoChanges,
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
