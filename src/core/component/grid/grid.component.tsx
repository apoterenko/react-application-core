import * as React from 'react';
import * as R from 'ramda';

import { IGridProps, IFieldProps } from '../../props-definitions.interface';
import { IGridColumnConfiguration } from '../../configurations-definitions.interface';
import { ISortDirectionEntity, IFieldChangeEntity } from '../../entities-definitions.interface';
import { IEntity, AnyT, UNDEF } from '../../definitions.interface';
import { toClassName, isDef, orNull, isFn } from '../../util';
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

    this.state = {filterChanges: {}};
  }

  /**
   * @stable - 08.04.2018
   * @returns {JSX.Element}
   */
  protected getView(): JSX.Element {
    const props = this.props;
    return (
      <div className={toClassName('rac-grid-container-wrapper', 'rac-flex', 'rac-flex-row')}>
        <div className={toClassName('rac-flex', 'rac-flex-full')}>
          <table className={toClassName('rac-grid rac-flex rac-flex-column', props.className)}>
            <thead className='rac-grid-head'>
              {this.getHeader()}
              {this.getFilter()}
            </thead>
            <tbody ref='container'
                   className='rac-grid-body'>
              {this.dataSource.map((entity) => this.getRow(entity))}
            </tbody>
          </table>
          {this.getAddAction()}
        </div>
        {
          orNull<JSX.Element>(
            props.useService,
            () => (
              <div className='rac-grid-service-wrapper'>
                <div className='rac-grid-service'>
                  {this.uiFactory.makeIcon({
                    type: 'more_vert',
                    className: 'rac-button-icon',
                    onClick: this.onSettingsClick,
                  })}
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

        const defaultLocalFilter = ({query, columnName, entity}) =>
          R.isNil(query) || R.isEmpty(query) || entity[columnName].toUpperCase().includes(query.toUpperCase());

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
  private getHeader(): JSX.Element {
    const props = this.props;
    return (
      <GridRow>
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
   * @returns {JSX.Element}
   */
  private getRow(entity: IEntity): JSX.Element {
    const rowKey = this.toRowKey(entity);
    return (
      <GridRow ref={rowKey}
               key={rowKey}
               className='grid-data-row'
               selected={this.isEntitySelected(entity)}
               onClick={() => this.onSelect(entity)}>
        {
          this.columnsConfiguration.map((column, columnNum) => (
            <GridColumn key={`${rowKey}-${columnNum}`}
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
    return props.useLocalFiltering ? state.filterChanges[name] : UNDEF;
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
}
