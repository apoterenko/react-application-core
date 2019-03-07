import * as R from 'ramda';

import {
  calc,
  join,
  normalizeTime,
  orNull,
  orUndef,
  toClassName,
  defValuesFilter,
  isFn,
  queryFilter,
  generateArray,
} from '../../util';
import {
  GridColumnConfigurationT,
  IGridColumnConfiguration,
  IGridFilterConfiguration,
} from '../../configurations-definitions.interface';
import { UNI_CODES, IEntity, EntityIdT } from '../../definitions.interface';
import {
  IGridState,
  ITimeGridBuilderConfigEntity,
} from './grid.interface';
import { SortDirectionEnum } from '../../entities-definitions.interface';
import { IGridProps } from '../../props-definitions.interface';
import { MultiFieldEntityT, toActualMultiItemEntities } from '../field';

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
  return generateArray(columnsCount)
    .map((_, index) => {
      const minPeriodAtMinutes = builderConfig.minPeriodAtMinutes;
      const currentHour = Math.floor(index / periodsPerHourCount);
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

/**
 * @stable [12.02.2019]
 * @param {IGridColumnConfiguration} column
 * @param {IGridProps} props
 * @returns {SortDirectionEnum}
 */
export const getGridColumnSortDirection = (column: IGridColumnConfiguration,
                                           props: IGridProps): SortDirectionEnum =>
  props.directions[column.name];

// TODO Need add the tests
export const filterAndSortGridOriginalDataSource = (source: IEntity[],
                                                    columns: IGridColumnConfiguration[],
                                                    props: IGridProps,
                                                    state: IGridState): IEntity[] => {
  if (R.isNil(source)) {
    return source;
  }
  if (props.useLocalSorting) {
    const sorters = columns
      .filter((column) => isFn(column.sorter) && !R.isNil(getGridColumnSortDirection(column, props)))
      .map((column) => (entity1, entity2) =>
        column.sorter(entity1, entity2) * (getGridColumnSortDirection(column, props) === 0 ? 1 : -1));
    if (sorters.length > 0) {
      source = R.sortWith(sorters, source);
    }
  }
  if (props.useLocalFiltering) {
    const filterChanges = state.filterChanges;
    const changedColumns = Object.keys(filterChanges);
    const defaultLocalFilter = (cfg: IGridFilterConfiguration) =>
      queryFilter(cfg.query, cfg.entity[cfg.columnName]);

    if (changedColumns.length > 0) {
      source = source.filter((entity) => {
        let result = true;
        changedColumns.forEach((columnName) => {
          const query = filterChanges[columnName];
          const column = columns.find((column0) => column0.name === columnName);
          result = result && (isFn(column.localFilter) ? column.localFilter : defaultLocalFilter)({query, columnName, entity});
        });
        return result;
      });
    }
  }
  return source;
};

/**
 * @stable [07.03.2019]
 * @param {MultiFieldEntityT} entity
 * @param {(item) => EntityIdT} groupValueAccessor
 * @returns {Record<EntityIdT, boolean>}
 */
export const toExpandedGridGroups =
  <TEntity extends IEntity>(entity: MultiFieldEntityT,
                            groupValueAccessor: (item: TEntity) => EntityIdT): Record<EntityIdT, boolean> =>
    R.mergeAll((toActualMultiItemEntities<TEntity>(entity) || []).map((item) => ({[groupValueAccessor(item)]: true})));
