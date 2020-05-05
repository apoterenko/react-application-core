import * as React from 'react';
import * as R from 'ramda';

import {
  IFieldProps,
} from '../../configurations-definitions.interface';
import {
  AnyT,
  EntityIdT,
  IEntity,
} from '../../definitions.interface';
import {
  calc,
  coalesce,
  ifNotNilThanValue,
  isDef,
  isExpandActionRendered,
  isFn,
  isHeaderRendered,
  isHighlightOdd,
  joinClassName,
  Mappers,
  orNull,
  orUndef,
} from '../../util';
import { BaseList } from '../list';
import { Checkbox } from '../field';
import { Field } from '../field';
import { FlexLayout } from '../layout/flex';
import { GridColumn } from './column';
import {
  GridHeader,
  GridHeaderColumn,
} from './header';
import { GridRow } from './row';
import { IGridState } from './grid.interface';
import {
  GroupValueRendererT,
  IFieldChangeEntity,
  IGridColumnProps,
  IGridProps,
  IGridRowConfigEntity,
  ISortDirectionEntity,
} from '../../definition';
import {
  filterAndSortGridOriginalDataSource,
  getGridColumnSortDirection,
} from './grid.support';

export class Grid extends BaseList<IGridProps, IGridState> {

  /**
   * @stable [07.06.2018]
   * @param {IGridProps} props
   */
  constructor(props: IGridProps) {
    super(props);
    this.onExpandAllGroups = this.onExpandAllGroups.bind(this);

    this.state = {filterChanges: {}, expandedGroups: {}, expandedAllGroups: false};
  }

  /**
   * @stable [23.10.2019]
   * @returns {JSX.Element}
   */
  protected getView(): JSX.Element {
    const props = this.props;
    const dataSource = this.dataSource;

    return (
      <div className={joinClassName('rac-grid-wrapper', props.wrapperClassName)}>
        <table
          cellPadding={0}
          cellSpacing={0}
          className={joinClassName('rac-grid', calc(props.className))}
        >
          {
            isHeaderRendered(props) && (
              <GridHeader stickyHead={props.stickyHead}>
                {this.headRowElement}
                {this.filterElement}
              </GridHeader>
            )
          }
          <tbody className='rac-grid-body'>
            {props.topTotal !== false && this.totalRowElement}
            {
              this.isGrouped
                ? this.getGroupedRows(dataSource)
                : dataSource.map((entity, rowNum) => this.getRow({entity, rowNum, highlightOdd: isHighlightOdd(props, rowNum)}))
            }
            {props.topTotal === false && this.totalRowElement}
          </tbody>
        </table>
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
  private onChangeHeaderField(payload: IFieldChangeEntity): void {
    const props = this.props;

    if (props.onChangeHeader) {
      props.onChangeHeader(payload);
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
    if (column.bool) {
      const name = this.toHeaderFieldName(columnNum);
      return (
        <Checkbox
          {...this.getDefaultFieldProps()}
          name={name}
          value={this.toCheckboxFieldValue(name)}
          onChange={(value) => this.onChangeHeaderField({value, name})}/>
      );
    } else if (isFn(column.headerRenderer)) {
      return column.headerRenderer(column);
    }
    return this.t(column.title as string);
  }

  private get headRowElement(): JSX.Element {
    const {expandedAllGroups} = this.state;
    const expandActionRendered = this.isExpandActionRendered;
    const {isGrouped, props} = this;

    return (
      <GridRow>
        {
          this.columnsConfiguration.map((column, columnNum) => (
            <GridHeaderColumn
              key={this.toHeaderColumnKey(columnNum)}
              {...getGridColumnSortDirection(column, this.props)}
              name={column.name}
              index={columnNum}
              onSortingDirectionChange={(payload: ISortDirectionEntity) =>
                props.onSortingDirectionChange({...payload, index: columnNum, multi: false})}
              {...column}
            >
              { // TODO (duplication)
                expandActionRendered && isGrouped && columnNum === 0 // TODO index 0 (duplication)
                ? this.uiFactory.makeIcon({
                    className: 'rac-grid-data-row-group-expanded-icon',
                    type: expandedAllGroups ? 'close-list' : 'open-list',
                    onClick: this.onExpandAllGroups,
                  })
                : this.getHeaderColumnContent(column, columnNum)
              }
            </GridHeaderColumn>
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
        return React.cloneElement<IFieldProps>(renderEl, {
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
        return React.cloneElement<IFieldProps>(renderEl, {
          value: this.toFilterFieldValue(name),
          placeholder: this.settings.messages.FILTER_PLACEHOLDER,
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
    const props = this.props;
    const {
      entity,
      groupedRows,
      highlightOdd,
      rowNum,
    } = rowConfig;
    const rowKey = this.toRowKey(entity);
    const entityChanges = props.changes[entity.id];
    const hasChanges = !R.isNil(entityChanges);
    const isPartOfGroup = !R.isNil(groupedRows);

    return (
      <GridRow
        {...Mappers.mapSelectableHoveredEntity(props)}
        key={rowKey}
        odd={highlightOdd}
        selected={this.isEntitySelected(entity)}
        entity={entity}
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
                <GridHeaderColumn
                  key={this.toFilterColumnKey(columnNum)}
                  index={columnNum}
                  {...column}
                >
                  {this.getFilterColumn(column, columnNum)}
                </GridHeaderColumn>
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
   * @returns {IFieldProps}
   */
  private getDefaultFieldProps(fieldProps?: IFieldProps): IFieldProps {
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
    return Field.isPrototypeOf(renderEl.type);
  }

  /**
   * @stable [10.10.2018]
   * @returns {IGridColumnProps[]}
   */
  private get columnsConfiguration(): IGridColumnProps[] {
    return R.filter<IGridColumnProps>((column) => column.rendered !== false, this.props.columnsConfiguration);
  }

  /**
   * @stable [04.07.2018]
   * @param {EntityIdT} groupedRowValue
   * @returns {string}
   */
  private toGroupedRowKey(groupedRowValue: EntityIdT): string {
    return `data-grouped-row-${groupedRowValue}`;
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
   * @param {EntityIdT} groupedRowValue
   * @param {number} columnNum
   * @returns {string}
   */
  private toGroupedColumnKey(groupedRowValue: EntityIdT, columnNum: number): string {
    return `data-grouped-column-${groupedRowValue}-${columnNum}`;
  }

  /**
   * @stable [27.12.2018]
   * @param {number} columnNum
   * @returns {string}
   */
  private toTotalColumnKey(columnNum: number): string {
    return `data-total-column-${columnNum}`;
  }

  /**
   * @stable [06.09.2018]
   * @param {IEntity[]} dataSource
   * @returns {JSX.Element[]}
   */
  private getGroupedRows(dataSource: IEntity[]): JSX.Element[] {
    if (R.isEmpty(dataSource)) {
      return [];
    }
    const props = this.props;
    const groupedDataSorter = props.groupedDataSorter;

    const preparedDataSource = isFn(groupedDataSorter)
      ? R.sort(
          (entity1, entity2) =>
            groupedDataSorter(this.extractGroupFieldValue(entity1), this.extractGroupFieldValue(entity2), entity1, entity2),
          dataSource
        )
      : dataSource;

    const groupedDataSourceMap = new Map();
    const groupValuesSet = new Set<EntityIdT>(); // To save original ordering
    const isGroupedByReadyData = this.isGroupedByReadyData;

    preparedDataSource.forEach((entity) => {
      let groupedDataSourceEntities;
      const groupFieldValue = this.extractGroupFieldValue(entity);

      if (isGroupedByReadyData) {
        groupValuesSet.add(entity.id);
        groupedDataSourceMap.set(entity.id, groupFieldValue);
      } else {
        /**
         * See https://www.ecma-international.org/ecma-262/6.0/#sec-set-objects
         * ...Append value as the last element of entries.
         *
         * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add
         * The add() method appends a new element with a specified value to the end of a Set object.
         */
        groupValuesSet.add(groupFieldValue);

        groupedDataSourceEntities = groupedDataSourceMap.get(groupFieldValue);
        if (!groupedDataSourceMap.has(groupFieldValue)) {
          groupedDataSourceMap.set(groupFieldValue, groupedDataSourceEntities = []);
        }
        groupedDataSourceEntities.push(entity);
      }
    });

    let groupingRowNum = 0;
    const rows = [];

    // See the comment at the top
    groupValuesSet.forEach((groupValue) => {
      const groupedRows = groupedDataSourceMap.get(groupValue);
      const highlightOdd = isHighlightOdd(props, groupingRowNum++);
      rows.push(this.getGroupingRow({value: groupValue, groupedRows, highlightOdd}));

      if (this.isGroupedRowExpanded(groupValue)) {
        groupedRows.forEach((entity, rowNum) => rows.push(this.getRow({entity, rowNum, groupedRows, highlightOdd})));
      }
    });
    return rows;
  }

  /**
   * @stable [06.12.2019]
   * @param {IGridRowConfigEntity} config
   * @returns {JSX.Element}
   */
  private getGroupingRow(config: IGridRowConfigEntity): JSX.Element {
    const props = this.props;
    const {value, groupedRows, highlightOdd} = config;
    const groupBy = props.groupBy;
    const groupValue = groupBy.groupValue;
    const isGroupValueArray = Array.isArray(groupValue);
    const isExpanded = this.isGroupedRowExpanded(value);
    const expandActionRendered = this.isExpandActionRendered;
    const columns = this.columnsConfiguration;

    return (
      <GridRow
        key={this.toGroupedRowKey(value)}
        grouped={true}
        odd={highlightOdd}
        groupExpanded={isExpanded}>
        {
          columns.map((column, columnNum) => {
            const key = this.toGroupedColumnKey(value, columnNum);
            const contentKey = this.toGroupedColumnKey(`${value}-content`, columnNum);
            const node = (
              columnNum === 0
                ? (
                  <FlexLayout
                    row={true}
                    full={false}
                    key={contentKey}>
                    {expandActionRendered && (
                      this.uiFactory.makeIcon({
                        className: 'rac-grid-data-row-group-expanded-icon',
                        type: isExpanded ? 'close-list' : 'open-list',
                        onClick: () => this.onExpandGroup(value, !isExpanded),
                      })
                    )} {
                    isFn(groupValue)
                      ? (groupValue as GroupValueRendererT)(value, groupedRows)
                      : (
                        isGroupValueArray
                          ? (isFn(groupValue[0]) ? groupValue[0](value, groupedRows) : null)
                          : value
                      )
                  }
                  </FlexLayout>
                )
                : (
                  orNull(
                    isGroupValueArray && isFn(groupValue[columnNum]),
                    () => groupValue[columnNum](value, groupedRows)
                  )
                )
            );

            return (
              <GridColumn
                key={key}
                {...column}>
                {node}
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
   * @stable [29.12.2019]
   * @param {EntityIdT} groupedRowValue
   * @param {boolean} expanded
   */
  private onExpandGroup(groupedRowValue: EntityIdT, expanded: boolean): void {
    this.setState(
      (previousState) => ({expandedGroups: {...previousState.expandedGroups, [groupedRowValue]: expanded}})
    );
  }

  /**
   * @stable [29.12.2019]
   */
  private onExpandAllGroups(): void {
    this.setState(
      (previousState) => ({expandedAllGroups: !previousState.expandedAllGroups, expandedGroups: {}})
    );
  }

  /**
   * @stable [03.09.2018]
   * @param {EntityIdT} groupedRowValue
   * @returns {boolean}
   */
  private isGroupedRowExpanded(groupedRowValue: EntityIdT): boolean {
    const state = this.state;
    const props = this.props;

    return coalesce(
      ifNotNilThanValue(state.expandedGroups, (expandedGroups) => expandedGroups[groupedRowValue]),
      ifNotNilThanValue(props.expandedGroups, (expandedGroups) => expandedGroups[groupedRowValue]),
      state.expandedAllGroups
    );
  }

  /**
   * @stable [29.12.2019]
   * @param {IEntity} entity
   * @returns {AnyT}
   */
  private extractGroupFieldValue(entity: IEntity): AnyT {
    const groupBy = this.props.groupBy;
    return Reflect.get(entity, groupBy.groupedFieldName || groupBy.fieldName);
  }

  /**
   * @stable [29.12.2019]
   * @returns {boolean}
   */
  private get isGrouped(): boolean {
    return isDef(this.props.groupBy);
  }

  /**
   * @stable [29.12.2019]
   * @returns {boolean}
   */
  private get isGroupedByReadyData(): boolean {
    return this.isGrouped && isDef(this.props.groupBy.groupedFieldName);
  }

  /**
   * @stable [27.10.2019]
   * @returns {boolean}
   */
  private get isExpandActionRendered(): boolean {
    return isExpandActionRendered(this.props);
  }
}
