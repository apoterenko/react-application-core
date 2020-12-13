import * as R from 'ramda';

import {
  FilterUtils,
  MultiFieldUtils,
  TypeUtils,
} from '../../util';
import {
  EntityIdT,
  IEntity,
} from '../../definitions.interface';
import {
  IGridState,
} from './grid.interface';
import {
  IGridColumnProps,
  IGridFilterConfigEntity,
  IGridProps,
  ISortDirectionEntity,
  MultiFieldValueT,
  SortDirectionsEnum,
} from '../../definition';

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
      .filter((column) => TypeUtils.isFn(column.sorter) && !R.isNil(getGridColumnSortDirection(column, props).direction))
      .map((column) => (entity1, entity2) =>
        column.sorter(entity1, entity2) * (getGridColumnSortDirection(column, props).direction === 0 ? 1 : -1));
    if (sorters.length > 0) {
      source = R.sortWith(sorters, source);
    }
  }
  if (props.localFiltration) {
    const filterChanges = state.filterChanges;
    const changedColumns = Object.keys(filterChanges);
    const defaultLocalFilter = (cfg: IGridFilterConfigEntity) =>
      FilterUtils.queryFilter(cfg.query, cfg.entity[cfg.columnName]);

    if (changedColumns.length > 0) {
      source = source.filter((entity) => {
        let result = true;
        changedColumns.forEach((columnName) => {
          const query = filterChanges[columnName];
          const column = columns.find((column0) => column0.name === columnName);
          if (!R.isNil(column)) {
            const localFilter = column.localFilter;
            result = result && (TypeUtils.isFn(localFilter) ? localFilter : defaultLocalFilter)({query, columnName, entity});
          }
        });
        return result;
      });
    }
  }
  return source;
};

/**
 * @deprecated MultiFieldUtils.multiFieldValueEntitiesAsTrueValuesObject
 */
export const asExpandedGridGroups =
  <TEntity extends IEntity>(entity: MultiFieldValueT<TEntity>,
                            groupValueAccessor: (item: TEntity) => EntityIdT = (item) => item.id): Record<EntityIdT, boolean> =>
    R.mergeAll((MultiFieldUtils.multiFieldValueAsEntities<TEntity>(entity) || [])
      .map((item) => ({[groupValueAccessor(item)]: true})));

