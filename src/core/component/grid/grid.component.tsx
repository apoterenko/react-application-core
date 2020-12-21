import * as React from 'react';
import * as R from 'ramda';

import {
  AnyT,
  EntityIdT,
  IEntity,
} from '../../definitions.interface';
import {
  calc,
  ConditionUtils,
  FieldUtils,
  ifNotNilThanValue,
  isDef,
  isFn,
  joinClassName,
  NvlUtils,
  ObjectUtils,
  orNull,
  PageUtils,
  TypeUtils,
  WrapperUtils,
} from '../../util';
import { BaseList } from '../list';
import { Field } from '../field/field/field.component';
import { GridColumn } from './column';
import { GridHead, GridHeadColumn, } from './head';
import { GridRow } from './row/grid-row.component';
import { IGridState } from './grid.interface';
import {
  DefaultEntities,
  GridClassesEnum,
  GroupValueRendererT,
  IconsEnum,
  IFieldChangeEntity,
  IFieldProps,
  IGridColumnConfigEntity,
  IGridColumnProps,
  IGridProps,
  IGridRowConfigEntity,
  IIconConfigEntity,
  IListRowsConfigEntity,
  ISortDirectionEntity,
  ITextFieldProps,
} from '../../definition';
import {
  filterAndSortGridOriginalDataSource,
  getGridColumnSortDirection,
} from './grid.support';

export class Grid extends BaseList<IGridProps, IGridState> {

  public static readonly defaultProps: IGridProps = {
    changes: {},
    headerRendered: true,
  };

  /**
   * @stable [07.06.2018]
   * @param {IGridProps} originalProps
   */
  constructor(originalProps: IGridProps) {
    super(originalProps);

    this.onHeadColumnClose = this.onHeadColumnClose.bind(this);
    this.onHeadColumnExpandAllGroups = this.onHeadColumnExpandAllGroups.bind(this);

    this.state = {
      filterChanges: {},
      page: DefaultEntities.FIRST_PAGE,
    };
  }

  /**
   * @stable [23.10.2019]
   * @returns {JSX.Element}
   */
  protected getView(): JSX.Element {
    const {
      closed,
    } = this.state;
    const {
      className,
      headerRendered,
      stickyHead,
      topTotal,
      wrapperClassName,
    } = this.originalProps;

    const dataSource = this.dataSource;
    const columnsConfiguration = this.columnsConfiguration;
    const rowsConfig = this.isGrouped
      ? this.getGroupedRows(dataSource)
      : {
        rows: dataSource.map((entity, rowNum) => this.getRowElement({
          columnsConfiguration,
          entity,
          rowNum,
        })),
      };

    return (
      <div className={joinClassName('rac-grid-wrapper', wrapperClassName)}>
        <table
          cellPadding={0}
          cellSpacing={0}
          className={joinClassName('rac-grid', calc(className))}
        >
          {
            headerRendered && (
              <GridHead stickyHead={stickyHead}>
                {this.headRowElement}
                {this.filterElement}
              </GridHead>
            )
          }
          {
            !closed && (
              <tbody className='rac-grid-body'>
                {topTotal !== false && this.totalRowElement}
                {rowsConfig.rows}
                {topTotal === false && this.totalRowElement}
              </tbody>
            )
          }
        </table>
        {this.getPageToolbarElement(rowsConfig)}
      </div>
    );
  }

  /**
   * @stable [07.06.2018]
   * @returns {IEntity[]}
   */
  protected filterAndSortOriginalDataSourceUsingLocalFiltersAndSorters(): IEntity[] {
    return filterAndSortGridOriginalDataSource(
      this.originalDataSource,
      this.columnsConfiguration,
      this.props,
      this.state
    );
  }

  /**
   * @stable [06.06.2018]
   * @param {IFieldChangeEntity} payload
   */
  private onChangeRowField(payload: IFieldChangeEntity): void {
    const props = this.props;

    if (props.onChange) {
      props.onChange(payload);
    }
  }

  /**
   * @stable [07.06.2018]
   * @param {IFieldChangeEntity} payload
   */
  private onChangeFilterField(payload: IFieldChangeEntity): void {
    const props = this.props;

    if (props.localFiltration) {
      this.setState({
        page: DefaultEntities.FIRST_PAGE,
        filterChanges: {
          ...this.state.filterChanges,
          [payload.name]: payload.value,
        },
      });
    } else if (props.onChangeFilter) {
      props.onChangeFilter(payload);
    }
  }

  /**
   * @stable - 06.04.2018
   * @param {IGridColumnProps} column
   * @param {number} columnNum
   * @returns {React.ReactNode}
   */
  private getHeaderColumnContent(column: IGridColumnProps, columnNum: number): React.ReactNode {
    if (isFn(column.headerRenderer)) {
      return column.headerRenderer(column);
    }
    return this.t(column.title as string);
  }

  private get headRowElement(): JSX.Element {
    const {
      allGroupsExpanded,
      closed,
    } = this.state;
    const {
      onSortingDirectionChange,
    } = this.originalProps;

    const isExpandActionRendered = this.isExpandActionRendered;
    const isGrouped = this.isGrouped;

    return (
      <GridRow>
        {
          this.columnsConfiguration.map((column, columnNum) => (
            <GridHeadColumn
              key={this.toHeaderColumnKey(columnNum)}
              {...getGridColumnSortDirection(column, this.props)}
              name={column.name}
              index={columnNum}
              closed={closed}
              onSortingDirectionChange={(payload: ISortDirectionEntity) => onSortingDirectionChange({
                ...payload,
                index: columnNum,
                multi: false,
              })}
              onClose={this.onHeadColumnClose}
              {...column}
            >
              {
                isExpandActionRendered && isGrouped && this.isExpandGroupColumn(columnNum)
                  ? (
                    this.makeExpandIcon(
                      allGroupsExpanded,
                      {onClick: this.onHeadColumnExpandAllGroups}
                    )
                  )
                  : this.getHeaderColumnContent(column, columnNum)
              }
            </GridHeadColumn>
          ))
        }
      </GridRow>
    );
  }

  private getColumn(cfg: IGridColumnConfigEntity): React.ReactNode {
    const {
      disabled,
    } = this.originalProps;
    const {
      column,
      entity,
      groupedRows,
      rowNum,
    } = cfg;
    const {
      tpl,
      renderer,
    } = column;
    const columnName = column.name;

    if (TypeUtils.isFn(tpl)) {
      return tpl(entity, column, rowNum);
    } else if (TypeUtils.isFn(renderer)) {
      const renderEl = renderer(entity, column, groupedRows);
      if (R.isNil(renderEl)) {
        return renderEl;
      }
      if (this.isElementField(renderEl)) {
        const fieldProps = renderEl.props;
        const {
          readOnly,
          value,
        } = fieldProps;

        return React.cloneElement<IFieldProps>(renderEl, {
          errorMessageRendered: false,
          keepChanges: true,
          name: columnName,
          readOnly: NvlUtils.nvl(readOnly, disabled),
          value: isDef(value) ? value : Reflect.get(entity, columnName),
          onChange: ($value) => this.onChangeRowField({
            value: $value,
            name: this.asFieldName(cfg),
            rawData: entity,
          }),
        });
      }
      return renderEl;
    } else if (columnName) {
      return Reflect.get(entity, columnName);
    }
    return null;
  }

  /**
   * @stable [07.06.2018]
   * @param {IGridColumnProps} column
   * @param {number} columnNum
   * @returns {React.ReactNode}
   */
  private getFilterColumn(column: IGridColumnProps,
                          columnNum: number): React.ReactNode {
    if (column.filterRenderer) {
      /**
       * Build using a renderer
       */
      const renderEl = column.filterRenderer(column);
      if (R.isNil(renderEl)) {
        return renderEl;
      }
      if (this.isElementField(renderEl)) {
        const name = this.toFilterFieldName(column, columnNum);
        return React.cloneElement<ITextFieldProps>(renderEl, {
          value: this.toFilterFieldValue(name),
          placeholder: this.settings.messages.SEARCH,
          clearActionRendered: true,
          errorMessageRendered: false,
          onChange: (value) => this.onChangeFilterField({value, name}),
        });
      }
      return renderEl;
    }
    return null;
  }

  /**
   * @stable [18.08.2020]
   * @param cfg
   */
  private getRowElement(cfg: IGridRowConfigEntity): JSX.Element {
    const originalProps = this.originalProps;
    const {
      changes,
      onSelect,
      itemConfiguration,
    } = originalProps;

    const {
      columnsConfiguration,
      entity,
      groupedRows,
      rowNum,
    } = cfg;

    const rowKey = this.toRowKey(entity);
    const entityChanges = changes[entity.id];
    const hasChanges = ObjectUtils.isObjectNotEmpty(entityChanges);
    const isPartOfGroup = TypeUtils.isDef(groupedRows);

    return (
      <GridRow
        entity={entity}
        index={rowNum}
        partOfGroup={isPartOfGroup}
        selected={this.isEntitySelected(entity)}
        onClick={onSelect}
        {...itemConfiguration}
        key={rowKey}
      >
        {
          columnsConfiguration.map((column, columnNum) => (
            <GridColumn
              index={columnNum}
              edited={hasChanges && column.name in entityChanges}
              entity={entity}
              {...column}
              key={`${rowKey}-${columnNum}`}
            >
              {this.getColumn({...cfg, column, columnNum})}
            </GridColumn>
          ))
        }
      </GridRow>
    );
  }

  /**
   * @stable [26.10.2019]
   * @returns {JSX.Element}
   */
  private get filterElement(): JSX.Element {
    const columns = this.columnsConfiguration;

    return (
      orNull(
        columns.some((column) => isFn(column.filterRenderer)),
        () => (
          <GridRow filter={true}>
            {
              columns.map((column, columnNum) => (
                <GridHeadColumn
                  key={this.toFilterColumnKey(columnNum)}
                  index={columnNum}
                  {...column}
                >
                  {this.getFilterColumn(column, columnNum)}
                </GridHeadColumn>
              ))
            }
          </GridRow>
        )
      )
    );
  }

  /**
   * @stable [07.06.2018]
   * @param {string} name
   * @returns {AnyT}
   */
  private toFilterFieldValue(name: string): unknown {
    const {
      localFiltration,
    } = this.originalProps;
    const state = this.state;

    return ConditionUtils.orUndef(localFiltration, () => state.filterChanges[name]);
  }

  /**
   * @stable [18.08.2020]
   * @param cfg
   */
  private asFieldName(cfg: IGridColumnConfigEntity): string {
    const {
      column,
      columnNum,
      entity,
    } = cfg;
    return column.name || FieldUtils.dynamicFieldName(`${entity.id}-${columnNum}`);   // Infinity scroll supporting
  }

  /**
   * @stable [18.08.2020]
   * @param element
   */
  private isElementField(element: JSX.Element): boolean {
    return Field.isPrototypeOf(element.type);
  }

  /**
   * @stable [07.06.2018]
   * @param {IGridColumnProps} column
   * @param {number} columnNum
   * @returns {string}
   */
  private toFilterFieldName(column: IGridColumnProps, columnNum: number): string {
    return column.name || `$$dynamic-filter-field-${columnNum}`;
  }

  /**
   * @stable - 06.04.2018
   * @param {number} columnNum
   * @returns {string}
   */
  private toHeaderFieldName(columnNum: number): string {
    return `$$dynamic-header-field-${columnNum}`;
  }

  /**
   * @stable - 05.04.2018
   * @param {number} columnNum
   * @returns {string}
   */
  private toFilterColumnKey(columnNum: number): string {
    return `grid-filter-column-${columnNum}`;
  }

  /**
   * @stable - 05.04.2018
   * @param {number} columnNum
   * @returns {string}
   */
  private toHeaderColumnKey(columnNum: number): string {
    return `grid-header-column-${columnNum}`;
  }

  /**
   * @stable [27.12.2018]
   * @returns {string}
   */
  private toTotalRowKey(): string {
    return `data-total-row`;
  }

  /**
   * @stable [05.10.2018]
   * @param {EntityIdT} groupRowValue
   * @param {number} columnNum
   * @returns {string}
   */
  private asGroupColumnKey(groupRowValue: EntityIdT, columnNum: number): string {
    return `data-group-column-${groupRowValue}-${columnNum}`;
  }

  /**
   * @stable [27.12.2018]
   * @param {number} columnNum
   * @returns {string}
   */
  private toTotalColumnKey(columnNum: number): string {
    return `data-total-column-${columnNum}`;
  }

  private getGroupedRows(dataSource: IEntity[]): IListRowsConfigEntity {
    if (R.isEmpty(dataSource)) {
      return {
        rows: [],
        totalCount: 0,
      };
    }
    const originalProps = this.originalProps;
    const {
      groupedDataSorter,
      localPagination,
      pageSize,
    } = originalProps;

    const preparedDataSource = isFn(groupedDataSorter)
      ? R.sort(
          (entity1, entity2) =>
            groupedDataSorter(this.extractGroupValue(entity1), this.extractGroupValue(entity2), entity1, entity2),
          dataSource
        )
      : dataSource;

    const groupedDataSourceMap = new Map();
    const groupValuesSet = new Set<EntityIdT>(); // To save original ordering
    const areGroupsReady = this.areGroupsReady;

    preparedDataSource.forEach((entity) => {
      let groupedDataSourceEntities;
      const groupValue = this.extractGroupValue(entity);

      if (areGroupsReady) {
        groupValuesSet.add(entity.id);
        groupedDataSourceMap.set(entity.id, groupValue);
      } else {
        /**
         * See https://www.ecma-international.org/ecma-262/6.0/#sec-set-objects
         * ...Append value as the last element of entries.
         *
         * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add
         * The add() method appends a new element with a specified value to the end of a Set object.
         */
        groupValuesSet.add(groupValue);

        groupedDataSourceEntities = groupedDataSourceMap.get(groupValue);
        if (!groupedDataSourceMap.has(groupValue)) {
          groupedDataSourceMap.set(groupValue, groupedDataSourceEntities = []);
        }
        groupedDataSourceEntities.push(entity);
      }
    });

    const rows = [];
    const columnsConfiguration = this.columnsConfiguration;
    const expandActionRendered = this.isExpandActionRendered;

    let rowIndex = 0;
    const from = (this.state.page - 1) * pageSize;
    const to = from + pageSize;

    // See the comment at the top
    groupValuesSet.forEach((groupValue) => {
      if (!localPagination || rowIndex >= from && rowIndex < to) {
        const groupedRows = groupedDataSourceMap.get(groupValue);
        const groupExpanded = this.isGroupExpanded(groupValue);
        const cfg = {
          columnsConfiguration,
          groupedRows,
          rowNum: rowIndex,
        };

        rows.push(
          this.getGroupRowElement({
            ...cfg,
            expandActionRendered,
            groupExpanded,
            value: groupValue,
          })
        );
        if (groupExpanded) {
          groupedRows.forEach((entity) => rows.push(this.getRowElement({...cfg, entity})));
        }
      }
      rowIndex++;
    });

    return {
      pagesCount: PageUtils.pagesCount({totalCount: groupValuesSet.size, pageSize}),
      rows,
      totalCount: groupValuesSet.size,
    };
  }

  /**
   * @stable [29.07.2020]
   * @param config
   */
  private getGroupRowElement(config: IGridRowConfigEntity): JSX.Element {
    const {
      groupBy,
      itemConfiguration,
    } = this.originalProps;
    const {
      groupValue,
    } = groupBy;
    const {
      columnsConfiguration,
      expandActionRendered,
      groupedRows,
      groupExpanded,
      rowNum,
      value,
    } = config;

    return (
      <GridRow
        {...itemConfiguration}
        key={this.asGroupRowKey(value)}
        group={true}
        index={rowNum}
        groupExpanded={groupExpanded}
      >
        {
          columnsConfiguration.map((column, columnNum) => {
            const asActualGroupValue = () => (
              TypeUtils.isFn(groupValue[columnNum])
                ? groupValue[columnNum](value, groupedRows)
                : null
            );

            return (
              <GridColumn
                key={this.asGroupColumnKey(value, columnNum)}
                {...column}
              >
                {
                  this.isExpandGroupColumn(columnNum)
                    ? (
                      expandActionRendered
                        ? (
                          this.makeExpandIcon(
                            groupExpanded,
                            {onClick: () => this.onExpandGroup(value, !groupExpanded)}
                          )
                        )
                        : (
                          TypeUtils.isFn(groupValue)
                            ? (groupValue as GroupValueRendererT)(value, groupedRows)
                            : asActualGroupValue()
                        )
                    )
                    : asActualGroupValue()
                }
              </GridColumn>
            );
          })
        }
      </GridRow>
    );
  }

  /**
   * @stable [27.10.2019]
   * @returns {JSX.Element}
   */
  private get totalRowElement(): JSX.Element {
    return ifNotNilThanValue(
      this.props.totalEntity,
      (totalEntity) => (
        <GridRow
          key={this.toTotalRowKey()}
          total={true}>
          {
            this.columnsConfiguration.map((column, columnNum) => (
              <GridColumn
                key={this.toTotalColumnKey(columnNum)}
                {...column}
              >
                {totalEntity[column.name]}
              </GridColumn>
            ))
          }
        </GridRow>
      )
    );
  }

  /**
   * @stable [30.07.2020]
   * @param groupValue
   * @param expanded
   */
  private onExpandGroup(groupValue: EntityIdT, expanded: boolean): void {
    this.setState(
      (previousState) => ({expandedGroups: {...previousState.expandedGroups, [groupValue]: expanded}})
    );
  }

  /**
   * @stable [28.07.2020]
   * @param closed
   */
  private onHeadColumnClose(closed: boolean): void {
    this.setState({closed});
  }

  /**
   * @stable [28.07.2020]
   */
  private onHeadColumnExpandAllGroups(): void {
    this.setState(
      (previousState) => ({allGroupsExpanded: !previousState.allGroupsExpanded, expandedGroups: {}})
    );
  }

  /**
   * @stable [30.07.2020]
   * @param groupExpanded
   * @param cfg
   */
  private makeExpandIcon(groupExpanded: boolean, cfg: IIconConfigEntity): JSX.Element {
    return this.uiFactory.makeIcon({
      className: GridClassesEnum.EXPAND_ACTION,
      type: groupExpanded
        ? IconsEnum.MINUS_SQUARE_REGULAR
        : IconsEnum.PLUS_SQUARE_REGULAR,
      ...cfg,
    });
  }

  /**
   * @stable [30.07.2020]
   * @param entity
   */
  private extractGroupValue(entity: IEntity): AnyT {
    const {
      groupName,
    } = this.originalProps.groupBy;

    return Reflect.get(entity, groupName);
  }

  /**
   * @stable [30.07.2020]
   * @param groupRowValue
   */
  private isGroupExpanded(groupRowValue: EntityIdT): boolean {
    const {
      allGroupsExpanded,
      expandedGroups,
    } = this.state;
    const $expandedGroups = NvlUtils.coalesce(
      expandedGroups,
      this.originalProps.expandedGroups,
      {}
    );
    return NvlUtils.nvl($expandedGroups[groupRowValue], allGroupsExpanded);
  }

  /**
   * @stable [30.07.2020]
   */
  private get isGrouped(): boolean {
    return TypeUtils.isDef(this.originalProps.groupBy);
  }

  /**
   * @stable [30.07.2020]
   * @param columnNum
   */
  private isExpandGroupColumn(columnNum: number): boolean {
    return columnNum === 0;
  }

  /**
   * @stable [30.07.2020]
   */
  private get areGroupsReady(): boolean {
    return this.isGrouped && this.originalProps.groupBy.areGroupsReady;
  }

  /**
   * @stable [30.07.2020]
   */
  private get isExpandActionRendered(): boolean {
    return WrapperUtils.isExpandActionRendered(this.mergedProps);
  }

  /**
   * @stable [30.07.2020]
   */
  private get columnsConfiguration(): IGridColumnProps[] {
    const {
      columnsConfiguration,
    } = this.originalProps;
    return R.filter<IGridColumnProps>((column) => column.rendered !== false, columnsConfiguration);
  }

  /**
   * @stable [29.07.2020]
   * @param groupRowValue
   */
  private asGroupRowKey(groupRowValue: EntityIdT): string {
    return `data-group-row-${groupRowValue}`;
  }
}
