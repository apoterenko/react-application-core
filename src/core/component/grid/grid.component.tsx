import * as React from 'react';
import * as R from 'ramda';

import { IGridProps, IFieldProps } from '../../props-definitions.interface';
import { GroupValueRendererT } from '../../configurations-definitions.interface';
import { IEntity, AnyT, EntityIdT } from '../../definitions.interface';
import {
  joinClassName,
  isDef,
  orNull,
  isFn,
  orUndef,
  cancelEvent,
  coalesce,
  isOddNumber,
  ifNotNilThanValue,
  ifNotFalseThanValue,
} from '../../util';
import { Checkbox } from '../field';
import { GridHeaderColumn } from './header';
import { GridColumn } from './column';
import { BaseList } from '../list';
import { GridRow } from './row';
import { Field } from '../field';
import { IGridState } from './grid.interface';
import { FlexLayout } from '../layout';
import {
  IBaseEvent,
  IFieldChangeEntity,
  IGridColumnProps,
  ISortDirectionEntity,
  UNIVERSAL_STICKY_ELEMENT_SELECTOR,
} from '../../definition';
import { filterAndSortGridOriginalDataSource, getGridColumnSortDirection } from './grid.support';

export class Grid extends BaseList<IGridProps, IGridState> {

  /**
   * @stable [07.06.2018]
   * @param {IGridProps} props
   */
  constructor(props: IGridProps) {
    super(props);
    this.onSortingDirectionChange = this.onSortingDirectionChange.bind(this);
    this.onExpandAllGroups = this.onExpandAllGroups.bind(this);

    this.state = {filterChanges: {}, expandedGroups: {}, expandedAllGroups: false};
  }

  /**
   * @stable [09.09.2018]
   * @returns {JSX.Element}
   */
  protected getView(): JSX.Element {
    const props = this.props;
    const dataSource = this.dataSource;

    return (
      <FlexLayout
        row={true}
        className={joinClassName('rac-grid-wrapper', props.wrapperClassName)}>
        <table
          cellPadding={0}
          cellSpacing={0}
          className={joinClassName('rac-grid', props.tightGrid && 'rac-tight-grid', props.className)}>
          <thead className={joinClassName('rac-grid-head', props.stickyHead && UNIVERSAL_STICKY_ELEMENT_SELECTOR)}>
            {this.headerElement}
            {this.filterElement}
          </thead>
          <tbody className='rac-grid-body'>
            {ifNotFalseThanValue(props.topTotal, () => this.totalRowElement)}
            {
              this.hasGrouping
                ? this.getGroupedRows(dataSource)
                : dataSource.map((entity, index) => this.getRow(entity, index, true))
            }
            {orNull(props.topTotal === false, () => this.totalRowElement)}
          </tbody>
        </table>
        {this.addActionElement}
      </FlexLayout>
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
   * @stable - 05.04.2018
   * @param {ISortDirectionEntity} payload
   */
  private onSortingDirectionChange(payload: ISortDirectionEntity): void {
    const props = this.props;
    if (props.onSortingDirectionChange) {
      props.onSortingDirectionChange(payload);
    }
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

    if (props.onChangeGrouping) {
      props.onChangeGrouping(payload);
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

    if (props.useLocalFiltering) {
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
    if (column.groupable) {
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
    return this.t(column.title);
  }

  private get headerElement(): JSX.Element {
    const {expandedAllGroups} = this.state;
    const {expandActionRendered, hasGrouping} = this;

    return (
      <GridRow className='rac-grid-header'>
        {
          this.columnsConfiguration.map((column, columnNum) => (
            <GridHeaderColumn
              key={this.toHeaderColumnKey(columnNum)}
              name={column.name}
              index={columnNum}
              direction={getGridColumnSortDirection(column, this.props)}
              onSortingDirectionChange={this.onSortingDirectionChange}
              {...column}
            >
              { // TODO (duplication)
                expandActionRendered && hasGrouping && columnNum === 0 // TODO index 0 (duplication)
                ? this.uiFactory.makeIcon({
                    key: `header-${columnNum}-expanded-action-${expandedAllGroups ? 'close' : 'open'}`,
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
    if (column.groupable) {
      return (
        /**
         * Default group field
         */
        <Checkbox {...this.getDefaultFieldProps()}
                  name={name}
                  value={this.toCheckboxFieldValue(name)}
                  onChange={(value) => this.onChangeGroupingRowField({value, name, rawData: entity})}/>
      );
    } else if (column.tpl) {
      /**
       * Build using a text template
       */
      return column.tpl(entity, column, rowNum);
    } else if (column.renderer) {
      /**
       * Build using a renderer
       */
      const renderEl = column.renderer(entity, column, groupedRows);
      if (R.isNil(renderEl)) {
        return renderEl;
      }
      if (this.isElementField(renderEl)) {
        return React.cloneElement<IFieldProps>(renderEl, {
          ...this.getDefaultFieldProps(renderEl.props),
          name: column.name,
          value: isDef(renderEl.props.value) ? renderEl.props.value : Reflect.get(entity, column.name),
          onChange: (value) => this.onChangeRowField({value, name, rawData: entity}),
        });
      }
      return renderEl;
    } else if (column.name) {
      /**
       * Build by a column name
       */
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
          placeholder: 'Filter',
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
   * @stable - 05.04.2018
   * @param {IEntity} entity
   * @param {number} rowNum
   * @param {boolean} applyOddClassName
   * @param {IEntity[]} groupedRows
   * @returns {JSX.Element}
   */
  private getRow(entity: IEntity,
                 rowNum: number,
                 applyOddClassName: boolean,
                 groupedRows?: IEntity[]): JSX.Element {
    const props = this.props;
    const rowKey = this.toRowKey(entity);
    const changes = props.changes;
    const entityChanges = changes[entity.id];
    const isRowSelectable = this.isRowSelectable;

    return (
      <GridRow
        ref={rowKey}
        key={rowKey}
        className={
          joinClassName(
            'rac-grid-data-row',
            `rac-grid-data-row-${entity.id}`,
            orUndef(props.applyOdd !== false && applyOddClassName && isOddNumber(rowNum), 'rac-grid-data-row-odd'),
            orUndef(props.hovered !== false, 'rac-grid-data-row-hovered'),
            orUndef(isRowSelectable, 'rac-grid-data-row-selectable')
          )
        }
        selected={this.isEntitySelected(entity)}
        onClick={orUndef(isRowSelectable, () => () => this.onSelect(entity))}>
        {
          this.columnsConfiguration.map((column, columnNum) => (
            <GridColumn
              key={`${rowKey}-${columnNum}`}
              index={columnNum}
              className={joinClassName(
                !R.isNil(entityChanges) && isDef(entityChanges[column.name]) && 'rac-grid-column-edited',
              )}
              entity={entity}
              {...column}>
              {this.getColumn(entity, column, columnNum, rowNum, groupedRows)}
            </GridColumn>
          ))
        }
      </GridRow>
    );
  }

  /**
   * @stable - 05.04.2018
   * @returns {JSX.Element}
   */
  private get filterElement(): JSX.Element {
    const columns = this.columnsConfiguration;
    const isAtLeastOneFilterExist = columns
      .filter((column) => !R.isNil(column.filterRenderer)).length > 0;

    return (
      orNull(
        isAtLeastOneFilterExist,
        () => (
          <GridRow className='rac-grid-filter-row'>
            {
              columns.map((column, columnNum) => (
                <GridHeaderColumn key={this.toFilterColumnKey(columnNum)}
                                  index={columnNum}
                                  {...column}>
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
    return orUndef<AnyT>(props.useLocalFiltering, () => state.filterChanges[name]);
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
    const groupedDataSorter = this.props.groupedDataSorter;
    const dataSource0 = isFn(groupedDataSorter)
      ? R.sort(
          (entity1, entity2) =>
            groupedDataSorter(this.extractGroupedValue(entity1), this.extractGroupedValue(entity2), entity1, entity2),
          dataSource
        )
      : dataSource;

    const rows = [];
    const groupedDataSource = {};
    const keysSet = new Set<EntityIdT>(); // To save original ordering

    dataSource0.forEach((entity) => {
      const groupColumnValue = this.extractGroupedValue(entity);

      /**
       * See https://www.ecma-international.org/ecma-262/6.0/#sec-set-objects
       * ...Append value as the last element of entries.
       *
       * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add
       * The add() method appends a new element with a specified value to the end of a Set object.
       */
      keysSet.add(groupColumnValue);

      let groupedDataSourceEntities = Reflect.get(groupedDataSource, groupColumnValue);
      if (!groupedDataSource.hasOwnProperty(groupColumnValue)) {
        Reflect.set(groupedDataSource, groupColumnValue, groupedDataSourceEntities = []);
      }
      groupedDataSourceEntities.push(entity);
    });

    // See the comment at the top
    keysSet.forEach((groupedRowValue) => {
      const groupedRows = groupedDataSource[groupedRowValue];
      rows.push(this.getGroupingRow(groupedRowValue, groupedRows));

      if (this.isGroupedRowExpanded(groupedRowValue)) {
        const applyOddClassName = groupedRows.length > 1;
        groupedRows.forEach((entity, index) => rows.push(this.getRow(entity, index, applyOddClassName, groupedRows)));
      }
    });
    return rows;
  }

  /**
   * @stable [04.07.2018]
   * @param {EntityIdT} groupedRowValue
   * @param {IEntity[]} groupedRows
   * @returns {JSX.Element}
   */
  private getGroupingRow(groupedRowValue: EntityIdT, groupedRows: IEntity[]): JSX.Element {
    const props = this.props;
    const groupBy = props.groupBy;
    const groupValue = groupBy.groupValue;
    const isGroupValueArray = Array.isArray(groupValue);
    const isExpanded = this.isGroupedRowExpanded(groupedRowValue);
    const expandActionRendered = this.expandActionRendered;
    const columns = this.columnsConfiguration;

    return (
      <GridRow
        key={this.toGroupedRowKey(groupedRowValue)}
        className={joinClassName(
          'rac-grid-data-row',
          'rac-grid-data-row-grouped',
          props.applyGroup !== false && isExpanded && 'rac-grid-data-row-group-expanded'
        )}>
        {
          columns.map((column, columnNum) => {
            const key = this.toGroupedColumnKey(groupedRowValue, columnNum);
            const contentKey = this.toGroupedColumnKey(`${groupedRowValue}-content`, columnNum);
            const node = (
              columnNum === 0
                ? (
                  <FlexLayout
                    row={true}
                    full={false}
                    key={contentKey}>
                    {expandActionRendered && (
                      this.uiFactory.makeIcon({
                        key: `${contentKey}-expanded-action-${isExpanded ? 'close' : 'open'}`,
                        className: 'rac-grid-data-row-group-expanded-icon',
                        type: isExpanded ? 'close-list' : 'open-list',
                        onClick: (event) => this.onExpandGroup(event, groupedRowValue, !isExpanded),
                      })
                    )} {
                    isFn(groupValue)
                      ? (groupValue as GroupValueRendererT)(groupedRowValue, groupedRows)
                      : (
                        isGroupValueArray
                          ? (isFn(groupValue[0]) ? groupValue[0](groupedRowValue, groupedRows) : null)
                          : groupedRowValue
                      )
                  }
                  </FlexLayout>
                )
                : (
                  orNull<React.ReactNode>(
                    isGroupValueArray && isFn(groupValue[columnNum]),
                    () => groupValue[columnNum](groupedRowValue, groupedRows)
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
   * @stable [27.12.2018]
   * @returns {JSX.Element}
   */
  private get totalRowElement(): JSX.Element {
    const props = this.props;
    const totalEntity = props.totalEntity;
    const columns = this.columnsConfiguration;

    return ifNotNilThanValue(
      totalEntity,
      () => (
        <GridRow
          key={this.toTotalRowKey()}
          className='rac-grid-data-row rac-grid-data-row-total'>
          {
            columns.map((column, columnNum) => (
              <GridColumn
                key={this.toTotalColumnKey(columnNum)}
                {...column}>
                {totalEntity[column.name]}
              </GridColumn>
            ))
          }
        </GridRow>
      )
    );
  }

  /**
   * @stable [04.07.2018]
   * @param {IBaseEvent} event
   * @param {EntityIdT} groupedRowValue
   * @param {boolean} expanded
   */
  private onExpandGroup(event: IBaseEvent, groupedRowValue: EntityIdT, expanded: boolean): void {
    cancelEvent(event);

    this.setState({expandedGroups: {...this.state.expandedGroups, [groupedRowValue]: expanded}});
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

  private onExpandAllGroups(event: IBaseEvent): void {
    cancelEvent(event);
    this.setState({expandedAllGroups: !this.state.expandedAllGroups, expandedGroups: {}});
  }

  /**
   * @stable [07.03.2019]
   * @param {IEntity} entity
   * @returns {AnyT}
   */
  private extractGroupedValue(entity: IEntity): AnyT {
    const groupBy = this.props.groupBy;
    return Reflect.get(entity, groupBy.columnName);
  }

  /**
   * @stable [27.07.2019]
   * @returns {boolean}
   */
  private get hasGrouping(): boolean {
    return isDef(this.props.groupBy);
  }

  /**
   * @stable [27.07.2019]
   * @returns {boolean}
   */
  private get expandActionRendered(): boolean {
    return this.props.expandActionRendered !== false;
  }
}
