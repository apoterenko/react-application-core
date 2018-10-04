import * as R from 'ramda';

import { calc, join, normalizeTime, orNull, orUndef, toClassName, defValuesFilter } from '../../util';
import { GridColumnConfigurationT } from '../../configurations-definitions.interface';
import { UNI_CODES } from '../../definitions.interface';
import { ITimeGridBuilderConfigEntity } from './grid.interface';

const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const HOURS_PER_HALF_OF_DAY = HOURS_PER_DAY / 2;
const RANGE_SEPARATOR = ` ${UNI_CODES.nDash} `;

/**
 * @stable [10.09.2018]
 */
export const DEFAULT_BUILDER_CONFIG: ITimeGridBuilderConfigEntity = {
  hourFrom: 0,
  hourTo: 23,
  cellWidthFactor: 1.2,
  minPeriodAtMinutes: 10,
  timeAbbreviationResolver: (isBeforeNoon: boolean) => isBeforeNoon ? 'am' : 'pm',
  timeResolver: (hour: number, isBeforeNoon?: boolean) => isBeforeNoon ? hour : hour - HOURS_PER_HALF_OF_DAY,
};

/**
 * @stable [04.10.2018]
 * @param {GridColumnConfigurationT} defaultConfig
 * @param {string} extraClassName
 * @returns {GridColumnConfigurationT}
 */
export const buildTimeGridInfoColumn = (defaultConfig: GridColumnConfigurationT, extraClassName?: string): GridColumnConfigurationT =>
  ({
    ...defaultConfig,
    columnClassName: (props) => toClassName(extraClassName, calc<string>(defaultConfig.columnClassName, props)),
  });

/**
 * @stable [13.09.2018]
 * @param {number} hour
 * @param {number} minutes
 * @param {ITimeGridBuilderConfigEntity} builderConfig
 * @returns {GridColumnConfigurationT}
 */
const toUsaTime = (hour: number, minutes: number, builderConfig?: ITimeGridBuilderConfigEntity): GridColumnConfigurationT => {
  const isBeforeNoon = hour < HOURS_PER_HALF_OF_DAY;
  const timeResolver = builderConfig.timeResolver;
  const timeAbbreviationResolver = builderConfig.timeAbbreviationResolver;
  const timeAbbreviation = timeAbbreviationResolver(isBeforeNoon) || '';
  const isUsaTimeAbbreviation = timeAbbreviation.length > 0;
  const localHour = timeResolver(hour, isBeforeNoon);
  const normalizedLocalHour = localHour === HOURS_PER_DAY && !isUsaTimeAbbreviation ? '00' : localHour;
  const normalizedMinutes = normalizeTime(String(minutes));
  const normalizedHour = normalizeTime(String(hour));
  return {
    name: `${normalizedHour}:${normalizedMinutes}`,
    title: join([normalizedLocalHour, timeAbbreviation], ' '),
    columnTitle: join([`${normalizedLocalHour}:${normalizedMinutes}`, timeAbbreviation], ' '),
  };
};

/**
 * @stable [10.09.2018]
 * @param {GridColumnConfigurationT} defaultConfig
 * @param {ITimeGridBuilderConfigEntity} builderConfig
 * @returns {GridColumnConfigurationT[]}
 */
export const buildTimeGridColumns = (
  defaultConfig?: GridColumnConfigurationT,
  builderConfig?: ITimeGridBuilderConfigEntity): GridColumnConfigurationT[] => {

  builderConfig = {
    ...DEFAULT_BUILDER_CONFIG,
    ...builderConfig,
  };
  const cellWidthFactor = builderConfig.cellWidthFactor;
  const periodsPerHourCount = MINUTES_PER_HOUR / builderConfig.minPeriodAtMinutes;
  const periodsCount = Math.max(periodsPerHourCount, 1);
  const columnsCount = periodsPerHourCount * HOURS_PER_DAY;

  let currentPeriodPerHour = 0;
  return new Array<GridColumnConfigurationT>(columnsCount).join(' ').split(' ')
    .map((_, position) => {
      const minPeriodAtMinutes = builderConfig.minPeriodAtMinutes;
      const currentHour = Math.floor(position / periodsPerHourCount);
      const ceilWidth = Math.floor(minPeriodAtMinutes / cellWidthFactor);
      const currentMinutes = currentPeriodPerHour * minPeriodAtMinutes;
      const columnClassName = toClassName(
        currentPeriodPerHour === periodsPerHourCount - 1 && 'rac-time-grid-bordered-column',
        'rac-time-grid-column'
      );

      const tillTime = currentHour * MINUTES_PER_HOUR + minPeriodAtMinutes;
      const tillHour = Math.floor(tillTime / MINUTES_PER_HOUR);
      const tillMinutes = tillTime - tillHour * MINUTES_PER_HOUR;
      const isSameHour = tillHour - currentHour <= 1;

      const currentUsaTime = toUsaTime(currentHour, currentMinutes, builderConfig);
      const tillUsaTime = toUsaTime(tillHour, tillMinutes, builderConfig);

      const item = defValuesFilter<GridColumnConfigurationT, GridColumnConfigurationT>({
        align: 'center',
        headerClassName: 'rac-time-grid-time-header-column',
        title: isSameHour
          ? currentUsaTime.title
          : join([currentUsaTime.title, tillUsaTime.title], RANGE_SEPARATOR),
        width: ceilWidth,
        headerRendered: currentPeriodPerHour === 0,
        headerWidth: ceilWidth * periodsCount,
        headerColSpan: orUndef<number>(currentPeriodPerHour === 0, periodsCount),
        columnTitle: isSameHour
          ? currentUsaTime.columnTitle
          : join([currentUsaTime.columnTitle, tillUsaTime.columnTitle], RANGE_SEPARATOR),
        tpl: () => UNI_CODES.noBreakSpace,
        ...defaultConfig,
        ...buildTimeGridInfoColumn({columnClassName: defaultConfig.columnClassName}, columnClassName),
        name: currentUsaTime.name,
      });

      currentPeriodPerHour = ++currentPeriodPerHour === periodsCount ? 0 : currentPeriodPerHour;
      return orNull<GridColumnConfigurationT>(
        builderConfig.hourFrom <= currentHour && currentHour <= builderConfig.hourTo, item
      );
    })
    .filter((item) => !R.isNil(item));
};
