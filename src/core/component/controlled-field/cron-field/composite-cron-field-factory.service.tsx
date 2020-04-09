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
  nvl,
} from '../../../util';
import { IDateConverter } from '../../../converter';
import {
  IEntity,
  StringNumberT,
  UNDEF,
} from '../../../definitions.interface';
import { IFieldProps } from '../../../configurations-definitions.interface';
import { ISettingsEntity } from '../../../settings';

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
      type: CompositeCronFieldItemsEnum.TO,
    },
    {
      order: 3,
      type: CompositeCronFieldItemsEnum.CRON,
    }
  ];

  @lazyInject(DI_TYPES.DateConverter) private readonly dc: IDateConverter;
  @lazyInject(DI_TYPES.Settings) private readonly settings: ISettingsEntity;

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
                return [CronPeriodsEnum.MONTHLY, CronPeriodsEnum.WEEKLY].includes(this.getPeriodValue(config));
              case CompositeCronFieldItemsEnum.TO:
                return ![CronPeriodsEnum.NO_REPETITIONS].includes(this.getPeriodValue(config));
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
          onChange: (fromDateValue) => this.onCompositeFieldChange(config, fromDateValue, this.getPeriodValue(config)),
        };
      case CompositeCronFieldItemsEnum.CRON:
        return {
          ...props,
          period: this.getPeriodValue(config) === CronPeriodsEnum.WEEKLY
            ? CronPeriodsEnum.WEEKLY
            : CronPeriodsEnum.MONTHLY,
        };
      case CompositeCronFieldItemsEnum.PERIOD:
        return {
          ...props,
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
    let cronFieldValue = R.equals(this.getPeriodValue(config), currentCronPeriod) // config.period == previousValue or currentValue
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
          this.asCronEntity(config, fromDateValue),
          (cronEntity) => (cronFieldValue = cronEntity)
        );
        break;
      case CronPeriodsEnum.NO_REPETITIONS:
        ifNotNilThanValue(
          this.asCronEntity(config, fromDateValue, true),
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
   * @stable [09.04.2020]
   * @param {ICompositeCronFieldConfigEntity} config
   * @param {DateTimeLikeTypeT} fromDateValue
   * @param {boolean} applyYear
   * @returns {string}
   */
  private asCronEntity(config: ICompositeCronFieldConfigEntity,
                       fromDateValue: DateTimeLikeTypeT,
                       applyYear = false): string {
    const fromDate = this.dc.asDayOfYearEntity({
      date: fromDateValue,
      // Need to consider the input props format
      inputFormat: this.getFieldFormat(this.getDateFromFieldItem(config).fieldConfiguration),
    });

    if (R.isNil(fromDate)) {
      return null;
    }
    let cronEntity = CronEntity.newInstance()
      .withHours(0)
      .withMinutes(0)
      .withMonths(fromDate.month + 1)  // The cron months range is 1-12
      .withDaysOfMonths(fromDate.day);

    if (applyYear) {
      cronEntity = cronEntity.withYears(fromDate.year);
    }
    return cronEntity.toExpression();
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
   * @stable [13.01.2020]
   * @param {ICompositeCronFieldConfigEntity} config
   * @returns {string}
   */
  private getPeriodFieldName(config: ICompositeCronFieldConfigEntity): string {
    return this.getFieldName(this.getPeriodFieldItem(config));
  }

  /**
   * @stable [12.01.2020]
   * @param {ICompositeCronFieldConfigEntity} config
   * @returns {IEntity}
   */
  private asContainerEntity(config: ICompositeCronFieldConfigEntity): IEntity {
    return config.container.props.entity;
  }

  /**
   * @stable [13.01.2020]
   * @param {ICompositeCronFieldConfigEntity} config
   * @returns {CronPeriodsEnum}
   */
  private getPeriodValue(config: ICompositeCronFieldConfigEntity): CronPeriodsEnum {
    return ifNotNilThanValue(
      this.getPeriodFieldName(config),
      (periodFieldName) => this.asContainerEntity(config)[periodFieldName]
    );
  }

  /**
   * @stable [09.04.2020]
   * @param {IFieldProps} props
   * @returns {string}
   */
  private getFieldFormat(props: IFieldProps): string {
    return nvl(props.format, this.settings.dateTime.uiDateFormat);
  }
}
