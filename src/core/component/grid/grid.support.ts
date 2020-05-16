import * as R from 'ramda';

import {
  calc,
  defValuesFilter,
  FieldUtils,
  isFn,
  join,
  makeArray,
  normalizeTime,
  orNull,
  orUndef,
  queryFilter,
  toClassName,
} from '../../util';
import { UNI_CODES, IEntity, EntityIdT } from '../../definitions.interface';
import {
  IGridState,
  ITimeGridBuilderConfigEntity,
} from './grid.interface';
import {
  IGridColumnProps,
  IGridFilterEntity,
  IGridProps,
  ISortDirectionEntity,
  MultiFieldEntityT,
  SortDirectionsEnum,
} from '../../definition';

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
 * @param {IGridColumnProps} defaultConfig
 * @param {string} extraClassName
 * @returns {IGridColumnProps}
 */
export const buildTimeGridInfoColumn = (defaultConfig: IGridColumnProps, extraClassName?: string): IGridColumnProps =>
  ({
    ...defaultConfig,
    columnClassName: (props) => toClassName(extraClassName, calc<string>(defaultConfig.columnClassName, props)),
  });

/**
 * @stable [13.09.2018]
 * @param {number} hour
 * @param {number} minutes
 * @param {ITimeGridBuilderConfigEntity} builderConfig
 * @returns {IGridColumnProps}
 */
const toUsaTime = (hour: number, minutes: number, builderConfig?: ITimeGridBuilderConfigEntity): IGridColumnProps => {
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
 * @param {IGridColumnProps} defaultConfig
 * @param {ITimeGridBuilderConfigEntity} builderConfig
 * @returns {IGridColumnProps[]}
 */
export const buildTimeGridColumns = (
  defaultConfig?: IGridColumnProps,
  builderConfig?: ITimeGridBuilderConfigEntity): IGridColumnProps[] => {

  builderConfig = {
    ...DEFAULT_BUILDER_CONFIG,
    ...builderConfig,
  };
  const cellWidthFactor = builderConfig.cellWidthFactor;
  const periodsPerHourCount = MINUTES_PER_HOUR / builderConfig.minPeriodAtMinutes;
  const periodsCount = Math.max(periodsPerHourCount, 1);
  const columnsCount = periodsPerHourCount * HOURS_PER_DAY;

  let currentPeriodPerHour = 0;
  return makeArray(columnsCount)
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

      const item = defValuesFilter<IGridColumnProps, IGridColumnProps>({
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
      return orNull<IGridColumnProps>(
        builderConfig.hourFrom <= currentHour && currentHour <= builderConfig.hourTo, item
      );
    })
    .filter((item) => !R.isNil(item));
};

/**
 * @stable [12.02.2019]
 * @param {IGridColumnProps} column
 * @param {IGridProps} props
 * @returns {SortDirectionsEnum}
 */
export const getGridColumnSortDirection = (column: IGridColumnProps,
                                           props: IGridProps): ISortDirectionEntity =>
  props.directions[column.name];

// TODO Refactoring
export const filterAndSortGridOriginalDataSource = (source: IEntity[],
                                                    columns: IGridColumnProps[],
                                                    props: IGridProps,
                                                    state: IGridState): IEntity[] => {
  if (R.isNil(source)) {
    return source;
  }
  if (props.localSorting) {
    const sorters = columns
      .filter((column) => isFn(column.sorter) && !R.isNil(getGridColumnSortDirection(column, props).direction))
      .map((column) => (entity1, entity2) =>
        column.sorter(entity1, entity2) * (getGridColumnSortDirection(column, props).direction === 0 ? 1 : -1));
    if (sorters.length > 0) {
      source = R.sortWith(sorters, source);
    }
  }
  if (props.localFiltration) {
    const filterChanges = state.filterChanges;
    const changedColumns = Object.keys(filterChanges);
    const defaultLocalFilter = (cfg: IGridFilterEntity) =>
      queryFilter(cfg.query, cfg.entity[cfg.columnName]);

    if (changedColumns.length > 0) {
      source = source.filter((entity) => {
        let result = true;
        changedColumns.forEach((columnName) => {
          const query = filterChanges[columnName];
          const column = columns.find((column0) => column0.name === columnName);
          if (!R.isNil(column)) {
            const localFilter = column.localFilter;
            result = result && (isFn(localFilter) ? localFilter : defaultLocalFilter)({query, columnName, entity});
          }
        });
        return result;
      });
    }
  }
  return source;
};

/**
 * @stable [29.12.2019]
 * @param {MultiFieldEntityT<TEntity extends IEntity>} entity
 * @param {(item: TEntity) => EntityIdT} groupValueAccessor
 * @returns {Record<EntityIdT, boolean>}
 */
export const asExpandedGridGroups =
  <TEntity extends IEntity>(entity: MultiFieldEntityT<TEntity>,
                            groupValueAccessor: (item: TEntity) => EntityIdT = (item) => item.id): Record<EntityIdT, boolean> =>
    R.mergeAll((FieldUtils.asMultiFieldEntities<TEntity>(entity) || []).map((item) => ({[groupValueAccessor(item)]: true})));
