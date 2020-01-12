import * as React from 'react';
import * as R from 'ramda';

import {
  CompositeCronFieldItemsEnum,
  CompositeCronFieldPropsT,
  CronPeriodsEnum,
  DateTimeLikeTypeT,
  FIELD_VALUE_TO_RESET,
  ICompositeCronFieldConfigEntity,
  ICompositeCronFieldItemEntity,
} from '../../../definition';
import { ControlledFieldFactory } from '../controlled-field-factory.service';
import {
  CronField,
  DateField,
  Select,
} from '../../field';
import {
  DI_TYPES,
  lazyInject,
  provideInSingleton,
} from '../../../di';
import {
  CronEntity,
  ifNotNilThanValue,
  isDef,
  isFn,
  isNumber,
} from '../../../util';
import { IDateConverter } from '../../../converter';
import {
  IEntity,
  StringNumberT,
  UNDEF,
} from '../../../definitions.interface';

@provideInSingleton(CompositeCronFieldFactory)
export class CompositeCronFieldFactory
  extends ControlledFieldFactory<ICompositeCronFieldConfigEntity,
    ICompositeCronFieldItemEntity,
    CompositeCronFieldItemsEnum> {

  private static readonly DEFAULT_FIELDS: ICompositeCronFieldItemEntity[] = [
    {
      order: 0,
      type: CompositeCronFieldItemsEnum.PERIOD,
    },
    {
      order: 1,
      type: CompositeCronFieldItemsEnum.FROM,
    },
    {
      order: 2,
      type: CompositeCronFieldItemsEnum.CRON,
    },
    {
      order: 3,
      type: CompositeCronFieldItemsEnum.TO,
    }
  ];

  @lazyInject(DI_TYPES.DateConverter) private readonly dc: IDateConverter;

  /**
   * @stable [18.12.2019]
   */
  constructor() {
    super();

    this.fields.set(CompositeCronFieldItemsEnum.CRON, <CronField/>);
    this.fields.set(CompositeCronFieldItemsEnum.FROM, <DateField/>);
    this.fields.set(CompositeCronFieldItemsEnum.PERIOD, <Select/>);
    this.fields.set(CompositeCronFieldItemsEnum.TO, <DateField/>);
  }

  /**
   * @stable [18.12.2019]
   * @param {ICompositeCronFieldConfigEntity} config
   * @returns {ICompositeCronFieldItemEntity[]}
   */
  protected getFields(config: ICompositeCronFieldConfigEntity): ICompositeCronFieldItemEntity[] {
    const userFields = super.getFields(config);
    return this.sortFields(
      CompositeCronFieldFactory.DEFAULT_FIELDS
        .filter((cfg) => {
            switch (cfg.type) {
              case CompositeCronFieldItemsEnum.CRON:
                return [CronPeriodsEnum.MONTHLY, CronPeriodsEnum.WEEKLY].includes(config.period);
              case CompositeCronFieldItemsEnum.TO:
                return ![CronPeriodsEnum.NO_REPETITIONS].includes(config.period);
            }
            return true;
          }
        )
        .map((defaultCfg) => {
          const userFieldConfig = userFields.find((userFieldConfig0) => userFieldConfig0.type === defaultCfg.type);
          return ifNotNilThanValue(
            userFieldConfig,
            () => R.mergeDeepRight(defaultCfg, userFieldConfig),
            defaultCfg
          );
        })
    );
  }

  /**
   * @stable [18.12.2019]
   * @param {ICompositeCronFieldConfigEntity} config
   * @param {ICompositeCronFieldItemEntity} actualFieldCfg
   * @param {ICompositeCronFieldItemEntity[]} actualFields
   * @returns {CompositeCronFieldPropsT}
   */
  protected getExtraProps(config: ICompositeCronFieldConfigEntity,
                          actualFieldCfg: ICompositeCronFieldItemEntity,
                          actualFields: ICompositeCronFieldItemEntity[]): CompositeCronFieldPropsT {
    const props = super.getExtraProps(config, actualFieldCfg, actualFields);

    switch (actualFieldCfg.type) {
      case CompositeCronFieldItemsEnum.FROM:
        return {
          ...props,
          onChange: (fromDateValue) => this.onCompositeFieldChange(config, fromDateValue, config.period),
        };
      case CompositeCronFieldItemsEnum.CRON:
        return {
          ...props,
          period: config.period === CronPeriodsEnum.WEEKLY ? CronPeriodsEnum.WEEKLY : CronPeriodsEnum.MONTHLY,
        };
      case CompositeCronFieldItemsEnum.PERIOD:
        return {
          onSelect: (option) => {
            const currentCronPeriod = isFn(config.cronPeriodsMapper)
              ? config.cronPeriodsMapper(option.value)
              : option.value;

            ifNotNilThanValue(
              this.getDateFromFieldName(config),
              (dateFromFieldName) =>
                this.onCompositeFieldChange(config, this.asContainerEntity(config)[dateFromFieldName], currentCronPeriod)
            );
          },
        };
    }
    return props;
  }

  /**
   * @stable [12.01.2020]
   * @param {ICompositeCronFieldConfigEntity} config
   * @param {DateTimeLikeTypeT} fromDateValue
   * @param {StringNumberT} currentCronPeriod
   */
  private onCompositeFieldChange(config: ICompositeCronFieldConfigEntity,
                                 fromDateValue: DateTimeLikeTypeT,
                                 currentCronPeriod: StringNumberT): void {
    let cronFieldValue = R.equals(config.period, currentCronPeriod) // config.period == previousValue or currentValue
      ? UNDEF
      : FIELD_VALUE_TO_RESET;

    switch (currentCronPeriod) {
      case CronPeriodsEnum.DAILY:
        cronFieldValue = CronEntity.newInstance()
          .withHours(0)
          .withMinutes(0)
          .toExpression();
        break;
      case CronPeriodsEnum.YEARLY:
        ifNotNilThanValue(
          this.asCronEntity(fromDateValue),
          (cronEntity) => (cronFieldValue = cronEntity)
        );
        break;
      case CronPeriodsEnum.NO_REPETITIONS:
        ifNotNilThanValue(
          this.asCronEntity(fromDateValue, true),
          (cronEntity) => (cronFieldValue = cronEntity)
        );
        break;
    }

    if (isDef(cronFieldValue)) {
      const proxy = this.$formStoreProxyFactory(config.container);

      ifNotNilThanValue(
        this.getCronFieldName(config),
        (cronFieldName) => proxy.dispatchFormChanges({[cronFieldName]: cronFieldValue})
      );
    }
  }

  /**
   * @stable [18.12.2019]
   * @param {DateTimeLikeTypeT} fromDateValue
   * @param {boolean} applyYear
   * @returns {string}
   */
  private asCronEntity(fromDateValue: DateTimeLikeTypeT, applyYear = false): string {
    const fromDate = this.dc.toMomentDate(fromDateValue, 'YYYY-MM-DD', false); // TODO

    if (isNumber(fromDate.month()) && isNumber(fromDate.date())) {
      let cronEntity = CronEntity.newInstance()
        .withHours(0)
        .withMinutes(0)
        .withMonths(fromDate.month() + 1) // TODO https://momentjs.com/docs/#/get-set/month/
        .withDaysOfMonths(fromDate.date());

      if (applyYear) {
        cronEntity = cronEntity.withYears(fromDate.year());
      }
      return cronEntity.toExpression();
    }
    return null;
  }

  /**
   * @stable [18.12.2019]
   * @param {ICompositeCronFieldConfigEntity} config
   * @returns {ICompositeCronFieldItemEntity}
   */
  private getCronFieldItem(config: ICompositeCronFieldConfigEntity): ICompositeCronFieldItemEntity {
    return super.getFields(config)
      .find((actualFieldCfg0) => actualFieldCfg0.type === CompositeCronFieldItemsEnum.CRON);
  }

  /**
   * @stable [12.01.2020]
   * @param {ICompositeCronFieldConfigEntity} config
   * @returns {ICompositeCronFieldItemEntity}
   */
  private getDateFromFieldItem(config: ICompositeCronFieldConfigEntity): ICompositeCronFieldItemEntity {
    return super.getFields(config)
      .find((actualFieldCfg0) => actualFieldCfg0.type === CompositeCronFieldItemsEnum.FROM);
  }

  /**
   * @stable [12.01.2020]
   * @param {ICompositeCronFieldConfigEntity} config
   * @returns {ICompositeCronFieldItemEntity}
   */
  private getPeriodFieldItem(config: ICompositeCronFieldConfigEntity): ICompositeCronFieldItemEntity {
    return super.getFields(config)
      .find((actualFieldCfg0) => actualFieldCfg0.type === CompositeCronFieldItemsEnum.PERIOD);
  }

  /**
   * @stable [12.01.2020]
   * @param {ICompositeCronFieldItemEntity} fieldItem
   * @returns {string}
   */
  private getFieldName(fieldItem: ICompositeCronFieldItemEntity): string {
    return ifNotNilThanValue(fieldItem.fieldConfiguration, (fCfg) => fCfg.name);
  }

  /**
   * @stable [12.01.2020]
   * @param {ICompositeCronFieldConfigEntity} config
   * @returns {string}
   */
  private getDateFromFieldName(config: ICompositeCronFieldConfigEntity): string {
    return this.getFieldName(this.getDateFromFieldItem(config));
  }

  /**
   * @stable [12.01.2020]
   * @param {ICompositeCronFieldConfigEntity} config
   * @returns {string}
   */
  private getCronFieldName(config: ICompositeCronFieldConfigEntity): string {
    return this.getFieldName(this.getCronFieldItem(config));
  }

  /**
   * @stable [12.01.2020]
   * @param {ICompositeCronFieldConfigEntity} config
   * @returns {IEntity}
   */
  private asContainerEntity(config: ICompositeCronFieldConfigEntity): IEntity {
    return config.container.props.entity;
  }
}
