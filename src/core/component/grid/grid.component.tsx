import * as React from 'react';
import * as R from 'ramda';

import { IGridProps, IFieldProps } from '../../props-definitions.interface';
import { IGridColumnConfiguration, IGridFilterConfiguration } from '../../configurations-definitions.interface';
import { ISortDirectionEntity, IFieldChangeEntity } from '../../entities-definitions.interface';
import { IEntity, AnyT, EntityIdT, IBasicEvent } from '../../definitions.interface';
import { toClassName, isDef, orNull, isFn, orUndef, queryFilter, orDefault, cancelEvent } from '../../util';
import { Checkbox } from '../field';
import { GridHeaderColumn } from './header';
import { GridColumn } from './column';
import { BaseList } from '../list';
import { GridRow } from './row';
import { Field } from '../field';
import { IGridState } from './grid.interface';

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
   * @stable - 08.04.2018
   * @returns {JSX.Element}
   */
  protected getView(): JSX.Element {
    const props = this.props;
    const dataSource = this.dataSource;

    return (
      <div className='rac-flex rac-flex-row'>
        <div className='rac-flex rac-flex-full'>
          <table className={toClassName('rac-grid rac-flex rac-flex-column', props.className)}>
            <thead className='rac-grid-head'>
              {this.headerElement}
              {this.getFilter()}
            </thead>
            <tbody ref='container'
                   className='rac-grid-body'>
              {
                orDefault<JSX.Element[], JSX.Element[]>(
                  isDef(props.groupBy),
                  () => this.getGroupedRows(dataSource),
                  () => dataSource.map((entity, index) => this.getRow(entity, index))
                )
              }
            </tbody>
          </table>
          {this.getAddAction()}
        </div>
        {
          orNull<JSX.Element>(
            props.useService || props.usePlusAction,
            () => (
              <div className='rac-grid-service-wrapper'>
                <div className='rac-grid-service'>
                  {orNull<JSX.Element>(
                    props.useService,
                    () => this.uiFactory.makeIcon({type: 'more_vert', onClick: this.onSettingsClick}),
                  )}
                  {orNull<JSX.Element>(
                    props.usePlusAction,
                    () => this.uiFactory.makeIcon({type: 'plus', onClick: this.onPlusClick}),
                  )}
                </div>
              </div>
            )
          )
        }
      </div>
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
      const renderEl = column.renderer(entity);
      if (R.isNil(renderEl)) {
        return renderEl;
      }
      if (this.isElementField(renderEl)) {
        return React.cloneElement<IFieldProps>(renderEl, {
          ...this.getDefaultFieldProps(),
          value: Reflect.get(entity, column.name),
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
          clearAction: true,
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
   * @returns {JSX.Element}
   */
  private getRow(entity: IEntity, index: number): JSX.Element {
    const props = this.props;
    const rowKey = this.toRowKey(entity);
    const changes = props.changes;
    const entityChanges = changes[entity.id];

    return (
      <GridRow ref={rowKey}
               key={rowKey}
               className={toClassName('rac-grid-data-row', index % 2 === 0 ? 'rac-grid-data-row-odd' : '')}
               selected={this.isEntitySelected(entity)}
               onClick={() => this.onSelect(entity)}>
        {
          this.columnsConfiguration.map((column, columnNum) => (
            <GridColumn key={`${rowKey}-${columnNum}`}
                        className={toClassName(
                          !R.isNil(entityChanges) && isDef(entityChanges[column.name]) && 'rac-grid-column-edited'
                        )}
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
  private getFilter(): JSX.Element {
    const columnsConfiguration = this.columnsConfiguration;
    const isAtLeastOneFilterExist = columnsConfiguration
      .filter((column) => !R.isNil(column.filterRenderer)).length > 0;

    return (
      orNull(
        isAtLeastOneFilterExist,
        () => (
          <GridRow>
            {
              columnsConfiguration.map((column, columnNum) => (
                <GridHeaderColumn key={this.toFilterColumnKey(columnNum)}
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
      notUseErrorMessage: true,
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
   * @stable [07.06.2018]
   * @returns {IGridColumnConfiguration[]}
   */
  private get columnsConfiguration(): IGridColumnConfiguration[] {
    return this.props.columnsConfiguration;
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
   * @stable [04.07.2018]
   * @param {EntityIdT} groupedRowValue
   * @returns {string}
   */
  private toGroupedColumnKey(groupedRowValue: EntityIdT): string {
    return `data-grouped-column-${groupedRowValue}`;
  }

  /**
   * @stable [04.07.2018]
   * @param {IEntity[]} dataSource
   * @returns {JSX.Element[]}
   */
  private getGroupedRows(dataSource: IEntity[]): JSX.Element[] {
    const state = this.state;
    const groupBy = this.props.groupBy;
    const rows = [];

    const groupedDataSource = {};
    dataSource.forEach((entity) => {
      const groupColumnValue = Reflect.get(entity, groupBy.columnName);

      let groupedDataSourceEntities = Reflect.get(groupedDataSource, groupColumnValue);
      if (!groupedDataSource.hasOwnProperty(groupColumnValue)) {
        Reflect.set(groupedDataSource, groupColumnValue, groupedDataSourceEntities = []);
      }
      groupedDataSourceEntities.push(entity);
    });

    Object.keys(groupedDataSource).forEach((groupedRowValue) => {
      const groupedRows = groupedDataSource[groupedRowValue];
      rows.push(this.getGroupingRow(groupedRowValue, groupedRows));

      if (state.expandedGroups[groupedRowValue]) {
        groupedRows.forEach((entity, index) => rows.push(this.getRow(entity, index)));
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
    const state = this.state;
    const isExpanded = Reflect.get(state.expandedGroups, groupedRowValue);

    return (
      <GridRow key={this.toGroupedRowKey(groupedRowValue)}
               className={toClassName('rac-grid-data-row')}
               colspan={this.columnsConfiguration.length}>
        {
          <GridColumn key={this.toGroupedColumnKey(groupedRowValue)}>
            {
              this.uiFactory.makeIcon({
                type: isExpanded ? 'minus_square' : 'plus_square',
                onClick: (event) => this.onExpandGroup(event, groupedRowValue, !isExpanded),
              })
            } {isFn(groupBy.groupValue) ? groupBy.groupValue(groupedRowValue, groupedRows) : groupedRowValue}
          </GridColumn>
        }
      </GridRow>
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
}
