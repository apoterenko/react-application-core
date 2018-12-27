import * as React from 'react';
import * as R from 'ramda';

import { IGridProps, IFieldProps } from '../../props-definitions.interface';
import { IGridColumnConfiguration, IGridFilterConfiguration, GroupValueRendererT } from '../../configurations-definitions.interface';
import { ISortDirectionEntity, IFieldChangeEntity } from '../../entities-definitions.interface';
import { IEntity, AnyT, EntityIdT, UNIVERSAL_STICKY_ELEMENT_SELECTOR} from '../../definitions.interface';
import {
  toClassName,
  isDef,
  orNull,
  isFn,
  orUndef,
  queryFilter,
  orDefault,
  cancelEvent,
  coalesce,
  isOddNumber,
  ifNotNilThanValue,
} from '../../util';
import { Checkbox } from '../field';
import { GridHeaderColumn } from './header';
import { GridColumn } from './column';
import { BaseList } from '../list';
import { GridRow } from './row';
import { Field } from '../field';
import { IGridState } from './grid.interface';
import { FlexLayout } from '../layout';
import { IBasicEvent } from '../../react-definitions.interface';

export class Grid extends BaseList<Grid, IGridProps, IGridState> {

  /**
   * @stable [07.06.2018]
   * @param {IGridProps} props
   */
  constructor(props: IGridProps) {
    super(props);
    this.onHeaderColumnClick = this.onHeaderColumnClick.bind(this);
    this.onSettingsClick = this.onSettingsClick.bind(this);
    this.onPlusClick = this.onPlusClick.bind(this);

    this.state = {filterChanges: {}, expandedGroups: {}};
  }

  /**
   * @stable [09.09.2018]
   * @returns {JSX.Element}
   */
  protected getView(): JSX.Element {
    const props = this.props;
    const dataSource = this.dataSource;

    const gridEl = (
      <FlexLayout row={true}
                  className='rac-grid-wrapper'>
        <table cellPadding={0}
               cellSpacing={0}
               className={toClassName(
                 'rac-grid',
                 'rac-flex',
                 'rac-flex-column',
                 props.tightGrid && 'rac-tight-grid',
                 props.className
               )}>
          <thead className={toClassName('rac-grid-head', props.stickyHead && UNIVERSAL_STICKY_ELEMENT_SELECTOR)}>
            {this.headerElement}
            {this.filterElement}
          </thead>
          <tbody ref='container'
                 className='rac-grid-body'>
            {this.totalRowElement}
            {
              orDefault<JSX.Element[], JSX.Element[]>(
                isDef(props.groupBy),
                () => this.getGroupedRows(dataSource),
                () => dataSource.map((entity, index) => this.getRow(entity, index))
              )
            }
          </tbody>
        </table>
        {this.addActionElement}
      </FlexLayout>
    );

    if (!props.useService) {
      return gridEl;
    }
    return (
      <FlexLayout row={true}>
        {gridEl}
        <div className='rac-grid-service-wrapper'>
          <div className='rac-grid-service'>
            {orNull<JSX.Element>(
              props.useService,
              () => this.uiFactory.makeIcon({type: 'more_vert', onClick: this.onSettingsClick}),
            )}
          </div>
        </div>
      </FlexLayout>
    );
  }

  /**
   * @stable [07.06.2018]
   * @returns {IEntity[]}
   */
  protected filterAndSortOriginalDataSourceUsingLocalFiltersAndSorters(): IEntity[] {
    const props = this.props;
    const state = this.state;
    const source = this.originalDataSource;

    if (!R.isNil(source)) {
      if (props.useLocalFiltering) {

        const filterChanges = state.filterChanges;
        const columns = this.columnsConfiguration;
        const changedColumns = Object.keys(filterChanges);
        const defaultLocalFilter = (cfg: IGridFilterConfiguration) =>
          queryFilter(cfg.query, cfg.entity[cfg.columnName]);

        if (changedColumns.length > 0) {
          return source.filter((entity) => {
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
    }
    return source;
  }

  private onSettingsClick(): void {
    // TODO
  }

  /**
   * @stable [12.08.2018]
   */
  private onPlusClick(): void {
    const props = this.props;

    if (props.onPlusClick) {
      props.onPlusClick();
    }
  }

  /**
   * @stable - 05.04.2018
   * @param {ISortDirectionEntity} payload
   */
  private onHeaderColumnClick(payload: ISortDirectionEntity): void {
    const props = this.props;
    if (props.onChangeSorting) {
      props.onChangeSorting(payload);
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
   * @param {IGridColumnConfiguration} column
   * @param {number} columnNum
   * @returns {React.ReactNode}
   */
  private getHeaderColumn(column: IGridColumnConfiguration, columnNum: number): React.ReactNode {
    if (column.useGrouping) {
      const name = this.toHeaderFieldName(columnNum);
      return (
        <Checkbox {...this.getDefaultFieldProps()}
                  name={name}
                  value={this.toCheckboxFieldValue(name)}
                  onChange={(value) => this.onChangeHeaderField({value, name})}/>
      );
    } else if (column.headerRenderer) {
      return column.headerRenderer(column);
    }
    return this.t(column.title);
  }

  /**
   * @stable - 06.04.2018
   * @returns {JSX.Element}
   */
  private get headerElement(): JSX.Element {
    const props = this.props;
    return (
      <GridRow className='rac-grid-header'>
        {
          this.columnsConfiguration.map((column, columnNum) => {
            const headerColumnName = this.toHeaderColumnKey(columnNum);
            return (
              <GridHeaderColumn key={headerColumnName}
                                name={headerColumnName}
                                index={columnNum}
                                direction={props.directions[headerColumnName]}
                                onClick={this.onHeaderColumnClick}
                                {...column}>
                {this.getHeaderColumn(column, columnNum)}
              </GridHeaderColumn>
            );
          })
        }
      </GridRow>
    );
  }

  /**
   * @stable [07.06.2018]
   * @param {IEntity} entity
   * @param {IGridColumnConfiguration} column
   * @param {number} columnNum
   * @returns {React.ReactNode}
   */
  private getColumn(entity: IEntity,
                    column: IGridColumnConfiguration,
                    columnNum: number): React.ReactNode {
    const name = this.toFieldName(entity, column, columnNum);
    if (column.useGrouping) {
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
      return column.tpl(entity);
    } else if (column.renderer) {
      /**
       * Build using a renderer
       */
      const renderEl = column.renderer(entity, column);
      if (R.isNil(renderEl)) {
        return renderEl;
      }
      if (this.isElementField(renderEl)) {
        return React.cloneElement<IFieldProps>(renderEl, {
          ...this.getDefaultFieldProps(),
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
   * @param {IGridColumnConfiguration} column
   * @param {number} columnNum
   * @returns {React.ReactNode}
   */
  private getFilterColumn(column: IGridColumnConfiguration,
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
          ...this.getDefaultFieldProps(),
          value: this.toFilterFieldValue(name),
          placeholder: 'Filter',
          clearActionRendered: true,
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
   * @param {number} index
   * @param {boolean} needToApplyOddClassName
   * @returns {JSX.Element}
   */
  private getRow(entity: IEntity, index: number, needToApplyOddClassName = true): JSX.Element {
    const props = this.props;
    const rowKey = this.toRowKey(entity);
    const changes = props.changes;
    const entityChanges = changes[entity.id];

    return (
      <GridRow ref={rowKey}
               key={rowKey}
               className={
                 toClassName(
                   'rac-grid-data-row',
                   orUndef<string>(props.applyOdd !== false && needToApplyOddClassName && isOddNumber(index), 'rac-grid-data-row-odd'),
                   orUndef<string>(props.hovered !== false, 'rac-grid-data-row-hovered'),
                   orUndef<string>(this.isRowSelectable, 'rac-grid-data-row-selectable')
                 )
               }
               selected={this.isEntitySelected(entity)}
               onClick={() => this.onSelect(entity)}>
        {
          this.columnsConfiguration.map((column, columnNum) => (
            <GridColumn key={`${rowKey}-${columnNum}`}
                        index={columnNum}
                        className={toClassName(
                          !R.isNil(entityChanges) && isDef(entityChanges[column.name]) && 'rac-grid-column-edited',
                        )}
                        entity={entity}
                        {...column}>
              {this.getColumn(entity, column, columnNum)}
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
  private getDefaultFieldProps(): IFieldProps {
    return {
      errorMessageRendered: false,
      readOnly: this.props.deactivated,
    };
  }

  /**
   * @stable [07.06.2018]
   * @param {IEntity} entity
   * @param {IGridColumnConfiguration} column
   * @param {number} columnNum
   * @returns {string}
   */
  private toFieldName(entity: IEntity, column: IGridColumnConfiguration, columnNum: number): string {
    return column.name || `$$dynamic-field-${entity.id}-${columnNum}`;   // Infinity scroll supporting
  }

  /**
   * @stable [07.06.2018]
   * @param {IGridColumnConfiguration} column
   * @param {number} columnNum
   * @returns {string}
   */
  private toFilterFieldName(column: IGridColumnConfiguration, columnNum: number): string {
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
   * @returns {IGridColumnConfiguration[]}
   */
  private get columnsConfiguration(): IGridColumnConfiguration[] {
    return R.filter<IGridColumnConfiguration>((column) => column.rendered !== false, this.props.columnsConfiguration);
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

    const groupBy = this.props.groupBy;
    const currentGroupedEntities = [];
    let rows = [];
    let currentGroupColumnValue;

    dataSource.forEach((entity) => {
      const groupColumnValue = Reflect.get(entity, groupBy.columnName);
      if (!R.equals(currentGroupColumnValue, groupColumnValue)
            && !R.isNil(currentGroupColumnValue)) {
        rows = this.buildRowsGroup(rows, currentGroupColumnValue, currentGroupedEntities);
        currentGroupedEntities.length = 0;
      }
      currentGroupColumnValue = groupColumnValue;
      currentGroupedEntities.push(entity);
    });
    if (currentGroupedEntities.length) {
      rows = this.buildRowsGroup(rows, currentGroupColumnValue, currentGroupedEntities);
    }
    return rows;
  }

  /**
   * @stable [06.09.2018]
   * @param {JSX.Element[]} rows
   * @param {EntityIdT} currentGroupColumnValue
   * @param {IEntity[]} currentGroupedEntities
   * @returns {JSX.Element[]}
   */
  private buildRowsGroup(rows: JSX.Element[],
                         currentGroupColumnValue: EntityIdT,
                         currentGroupedEntities: IEntity[]): JSX.Element[] {
    rows = rows.concat(this.getGroupingRow(currentGroupColumnValue, currentGroupedEntities));
    if (this.isGroupedRowExpanded(currentGroupColumnValue)) {
      const needToApplyOddClassName = currentGroupedEntities.length > 1;
      return rows.concat(currentGroupedEntities.map((entity0, index) => this.getRow(entity0, index, needToApplyOddClassName)));
    }
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
    const isExpanded = this.isGroupedRowExpanded(groupedRowValue);
    const columns = this.columnsConfiguration;

    return (
      <GridRow key={this.toGroupedRowKey(groupedRowValue)}
               className={toClassName(
                 'rac-grid-data-row',
                 'rac-grid-data-row-grouped',
                 isExpanded && 'rac-grid-data-row-group-expanded'
               )}>
        {
          columns.map((column, columnNum) => (
            <GridColumn key={this.toGroupedColumnKey(groupedRowValue, columnNum)}
                        {...column}>
              {orDefault<React.ReactNode, React.ReactNode>(
                columnNum === 0,
                () => (
                  [
                    <FlexLayout row={true}
                                key={this.toGroupedColumnKey(`${groupedRowValue}-content`, columnNum)}>
                      {orNull<JSX.Element>(props.expandActionRendered !== false, () => (
                        this.uiFactory.makeIcon({
                          className: 'rac-grid-data-row-group-expanded-icon',
                          type: isExpanded ? 'minus_square' : 'plus_square',
                          onClick: (event) => this.onExpandGroup(event, groupedRowValue, !isExpanded),
                        })
                      ))} {
                        isFn(groupBy.groupValue)
                          ? (groupBy.groupValue as GroupValueRendererT)(groupedRowValue, groupedRows)
                          : (Array.isArray(groupBy.groupValue)
                                ? (isFn(groupBy.groupValue[0]) ? groupBy.groupValue[0](groupedRowValue, groupedRows) : null)
                                : groupedRowValue)
                      }
                    </FlexLayout>
                  ]
                ),
                () => orNull<React.ReactNode>(
                  Array.isArray(groupBy.groupValue) && isFn(groupBy.groupValue[columnNum]),
                  () => groupBy.groupValue[columnNum](groupedRowValue, groupedRows)
                )
              )}
            </GridColumn>
          ))
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
        <GridRow key={this.toTotalRowKey()}
                 className={'rac-grid-data-row rac-grid-data-row-total'}>
          {
            columns.map((column, columnNum) => (
              <GridColumn key={this.toTotalColumnKey(columnNum)}
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
   * @param {IBasicEvent} event
   * @param {EntityIdT} groupedRowValue
   * @param {boolean} expanded
   */
  private onExpandGroup(event: IBasicEvent, groupedRowValue: EntityIdT, expanded: boolean): void {
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
      !R.isNil(state.expandedGroups) && Reflect.get(state.expandedGroups, groupedRowValue),
      !R.isNil(props.expandedGroups) && Reflect.get(props.expandedGroups, groupedRowValue),
      false
    );
  }
}
