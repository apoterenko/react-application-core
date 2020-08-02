import * as React from 'react';
import * as R from 'ramda';

import { IFieldProps2, } from '../../configurations-definitions.interface';
import {
  AnyT,
  EntityIdT,
  IEntity,
} from '../../definitions.interface';
import {
  calc,
  ifNotNilThanValue,
  isDef,
  isFn,
  isHighlightOdd,
  joinClassName,
  Mappers,
  NvlUtils,
  orNull,
  orUndef,
  PageUtils,
  TypeUtils,
  WrapperUtils,
} from '../../util';
import { BaseList } from '../list';
import {
  Checkbox,
  Field2,
} from '../field';
import { GridColumn } from './column';
import { GridHead, GridHeadColumn, } from './head';
import { GridRow } from './row';
import { IGridState } from './grid.interface';
import {
  DefaultEntities,
  GridClassesEnum,
  GroupValueRendererT,
  IconsEnum,
  IFieldChangeEntity,
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
    const rowsConfig = this.isGrouped
      ? this.getGroupedRows(dataSource)
      : {
        rows: dataSource.map((entity, rowNum) => this.getRow({entity, rowNum, highlightOdd: isHighlightOdd(this.originalProps, rowNum)})),
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
  private onChangeGroupingRowField(payload: IFieldChangeEntity): void {
    const props = this.props;

    if (props.onChangeBoolValue) {
      props.onChangeBoolValue(payload);
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

  /**
   * @stable [07.06.2018]
   * @param {IEntity} entity
   * @param {IGridColumnProps} column
   * @param {number} columnNum
   * @param {number} rowNum
   * @param {IEntity[]} groupedRows
   * @returns {React.ReactNode}
   */
  private getColumn(entity: IEntity,
                    column: IGridColumnProps,
                    columnNum: number,
                    rowNum: number,
                    groupedRows?: IEntity[]): React.ReactNode {
    const name = this.toFieldName(entity, column, columnNum);
    if (column.bool) {
      return (
        <Checkbox
          {...this.getDefaultFieldProps()}
          name={name}
          value={this.toCheckboxFieldValue(name)}
          onChange={(value) => this.onChangeGroupingRowField({value, name, rawData: entity})}/>
      );
    } else if (column.tpl) {
      return column.tpl(entity, column, rowNum);
    } else if (column.renderer) {
      const renderEl = column.renderer(entity, column, groupedRows);
      if (R.isNil(renderEl)) {
        return renderEl;
      }
      if (this.isElementField(renderEl)) {
        const props = renderEl.props;
        const propsValue = props.value;
        return React.cloneElement<IFieldProps2>(renderEl, {
          ...this.getDefaultFieldProps(props),
          name: column.name,
          keepChanges: true,
          value: isDef(propsValue) ? propsValue : Reflect.get(entity, column.name),
          onChange: (value) => this.onChangeRowField({value, name, rawData: entity}),
        });
      }
      return renderEl;
    } else if (column.name) {
      return Reflect.get(entity, column.name);
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
   * @stable [06.12.2019]
   * @param {IGridRowConfigEntity} rowConfig
   * @returns {JSX.Element}
   */
  private getRow(rowConfig: IGridRowConfigEntity): JSX.Element {
    const {
      changes = {},
    } = this.originalProps;

    const props = this.props;
    const {
      entity,
      groupedRows,
      highlightOdd,
      rowNum,
    } = rowConfig;
    const rowKey = this.toRowKey(entity);
    const entityChanges = changes[entity.id];
    const hasChanges = !R.isNil(entityChanges);
    const isPartOfGroup = !R.isNil(groupedRows);

    return (
      <GridRow
        {...Mappers.selectableHoveredEntity(props)}
        key={rowKey}
        odd={highlightOdd}
        selected={this.isEntitySelected(entity)}
        rawData={entity}
        partOfGroup={isPartOfGroup}
        onClick={props.onSelect}
      >
        {
          this.columnsConfiguration.map((column, columnNum) => (
            <GridColumn
              index={columnNum}
              edited={hasChanges && column.name in entityChanges}
              entity={entity}
              {...column}
              key={`${rowKey}-${columnNum}`}
            >
              {this.getColumn(entity, column, columnNum, rowNum, groupedRows)}
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
  private toFilterFieldValue(name: string): AnyT {
    const props = this.props;
    const state = this.state;
    return orUndef<AnyT>(props.localFiltration, () => state.filterChanges[name]);
  }

  /**
   * @stable [07.06.2018]
   * @returns {IFieldProps2}
   */
  private getDefaultFieldProps(fieldProps?: IFieldProps2): IFieldProps2 {
    return {
      errorMessageRendered: false,
      readOnly: (fieldProps && fieldProps.readOnly) || this.props.deactivated,
    };
  }

  /**
   * @stable [07.06.2018]
   * @param {IEntity} entity
   * @param {IGridColumnProps} column
   * @param {number} columnNum
   * @returns {string}
   */
  private toFieldName(entity: IEntity, column: IGridColumnProps, columnNum: number): string {
    return column.name || `$$dynamic-field-${entity.id}-${columnNum}`;   // Infinity scroll supporting
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
   * @stable - 06.04.2018
   * @param {string} fieldName
   * @returns {AnyT}
   */
  private toFieldValue(fieldName: string): AnyT {
    return this.props.changes[fieldName];
  }

  /**
   * @stable - 06.04.2018
   * @param {string} fieldName
   * @returns {AnyT}
   */
  private toCheckboxFieldValue(fieldName: string): AnyT {
    const fieldValue = this.toFieldValue(fieldName);
    return isDef(fieldValue) ? fieldValue : false;
  }

  /**
   * @stable [07.06.2018]
   * @param {JSX.Element} renderEl
   * @returns {boolean}
   */
  private isElementField(renderEl: JSX.Element): boolean {
    return Field2.isPrototypeOf(renderEl.type);
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

    let groupingRowNum = 0;
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
        const highlightOdd = isHighlightOdd(originalProps, groupingRowNum++);
        const groupExpanded = this.isGroupExpanded(groupValue);

        rows.push(
          this.getGroupRow({
            columnsConfiguration,
            expandActionRendered,
            groupedRows,
            groupExpanded,
            highlightOdd,
            value: groupValue,
          })
        );

        if (groupExpanded) {
          groupedRows.forEach((entity, rowNum) => rows.push(this.getRow({entity, rowNum, groupedRows, highlightOdd})));
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
  private getGroupRow(config: IGridRowConfigEntity): JSX.Element {
    const {
      groupValue,
    } = this.originalProps.groupBy;
    const {
      columnsConfiguration,
      expandActionRendered,
      groupedRows,
      groupExpanded,
      highlightOdd,
      value,
    } = config;

    return (
      <GridRow
        key={this.asGroupRowKey(value)}
        odd={highlightOdd}
        group={true}
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
      className: GridClassesEnum.GRID_EXPAND_ACTION,
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
