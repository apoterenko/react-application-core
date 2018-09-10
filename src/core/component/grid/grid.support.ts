import * as R from 'ramda';

import { isFn, join, normalizeTime, orNull, orUndef, toClassName } from '../../util';
import { GridColumnConfigurationT } from '../../configurations-definitions.interface';
import { UNI_CODES } from '../../definitions.interface';
import { ITimeGridBuilderConfigEntity } from './grid.interface';

const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const HOURS_PER_HALF_OF_DAY = HOURS_PER_DAY / 2;

/**
 * @stable [10.09.2018]
 */
export const DEFAULT_BUILDER_CONFIG: ITimeGridBuilderConfigEntity = {
  hourFrom: 0,
  hourTo: 23,
  cellWidthFactor: 1.2,
  minPeriodAtMinutes: 10,
  timeAbbreviationResolver: (isBeforeNoon: boolean) => isBeforeNoon ? 'am' : 'pm',
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
  const timeAbbreviationResolver = builderConfig.timeAbbreviationResolver;
  const periodsPerHourCount = MINUTES_PER_HOUR / builderConfig.minPeriodAtMinutes;
  const columnsCount = periodsPerHourCount * HOURS_PER_DAY;

  let currentPeriodPerHour = 0;
  return new Array<GridColumnConfigurationT>(columnsCount).join(' ').split(' ')
    .map((_, position) => {
      const currentHour = Math.floor(position / periodsPerHourCount);
      const isBeforeNoon = currentHour < HOURS_PER_HALF_OF_DAY;
      const timeAbbreviation = timeAbbreviationResolver(isBeforeNoon);
      const ceilWidth = Math.floor(builderConfig.minPeriodAtMinutes / cellWidthFactor);
      const currentMinutes = currentPeriodPerHour * builderConfig.minPeriodAtMinutes;
      const usaCurrentHour = isBeforeNoon ? currentHour : currentHour - HOURS_PER_HALF_OF_DAY;
      const normalizedTime = normalizeTime(String(currentMinutes));
      const normalizedHour = normalizeTime(String(currentHour));
      const columnClassName = currentPeriodPerHour === periodsPerHourCount - 1 && 'rac-time-grid-border-column';

      const item: GridColumnConfigurationT = {
        align: 'center',
        title: join([usaCurrentHour, timeAbbreviation], ' '),
        width: ceilWidth,
        headerRendered: currentPeriodPerHour === 0,
        headerWidth: ceilWidth * periodsPerHourCount,
        headerColSpan: orUndef<number>(currentPeriodPerHour === 0, periodsPerHourCount),
        columnTitle: join([`${usaCurrentHour}:${normalizedTime}`, timeAbbreviation], ' '),
        headerClassName: 'rac-time-grid-time-header-column',
        tpl: () => UNI_CODES.noBreakSpace,
        ...defaultConfig,
        columnClassName: (props) => toClassName(
          columnClassName,
          isFn(defaultConfig.columnClassName)
            ? (defaultConfig.columnClassName as (props) => string)(props)
            : defaultConfig.columnClassName as string,
        ),
        name: `${normalizedHour}:${normalizedTime}`,
      };

      currentPeriodPerHour = ++currentPeriodPerHour === periodsPerHourCount ? 0 : currentPeriodPerHour;
      return orNull<GridColumnConfigurationT>(
        builderConfig.hourFrom <= currentHour && currentHour <= builderConfig.hourTo, item
      );
    })
    .filter((item) => !R.isNil(item));
};
