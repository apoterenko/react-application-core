import * as React from 'react';

import { IGridColumnConfiguration } from '../../configurations-definitions.interface';
import { ISortDirectionEntity, IFieldChangeEntity } from '../../entities-definitions.interface';
import { IEntity, AnyT } from '../../definitions.interface';
import { toClassName, isDef, orNull } from '../../util';
import { IGridProps } from './grid.interface';
import { Checkbox } from '../field';
import { GridHeaderColumn } from './header';
import { GridColumn } from './column';
import { BaseList } from '../list';
import { GridRow } from './row';

export class Grid extends BaseList<Grid, IGridProps> {

  constructor(props: IGridProps) {
    super(props);
    this.onHeaderColumnClick = this.onHeaderColumnClick.bind(this);
    this.onSettingsClick = this.onSettingsClick.bind(this);
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
            {this.getDataSource().map((entity) => this.getRow(entity))}
            </tbody>
          </table>
          {this.getAddAction()}
        </div>
        <div className='rac-grid-service-wrapper'>
          <div className='rac-grid-service'>
            {this.uiFactory.makeIcon({
              type: 'more_vert',
              className: 'rac-button-icon',
              onClick: this.onSettingsClick,
            })}
          </div>
        </div>
      </div>
    );
  }

  private getFilterColumn(column: IGridColumnConfiguration): React.ReactNode {
    const props = this.props;
    if (column.useGrouping) {
      return null;
    }
    // TODO
    return '..';
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
    if (props.onChangeSortDirection) {
      props.onChangeSortDirection(payload);
    }
  }

  /**
   * @stable - 05.04.2018
   * @param {IFieldChangeEntity} payload
   */
  private onChangeField(payload: IFieldChangeEntity): void {
    const props = this.props;
    if (props.onChange) {
      props.onChange(payload);
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
        <Checkbox name={name}
                  value={this.toCheckboxFieldValue(name)}
                  onChange={(value) => this.onChangeField({value, name})}/>
      );
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
   * @stable - 06.04.2018
   * @param {IEntity} entity
   * @param {IGridColumnConfiguration} column
   * @param {number} columnNum
   * @returns {React.ReactNode}
   */
  private getColumn(entity: IEntity,
                    column: IGridColumnConfiguration,
                    columnNum: number): React.ReactNode {
    if (column.useGrouping) {
      const name = this.toFieldName(entity, columnNum);
      return (
        <Checkbox name={name}
                  value={this.toCheckboxFieldValue(name)}
                  onChange={(value) => this.onChangeField({value, name})}/>
      );
    } else if (column.tpl) {
      return column.tpl(entity);
    } else if (column.renderer) {
      return column.renderer(entity);
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
      .filter((column) => column.useLocalFiltering).length > 0;

    return (
      orNull(
        isAtLeastOneFilterExist,
        () => (
          <GridRow>
            {
              columnsConfiguration.map((column, columnNum) => (
                <GridHeaderColumn key={this.toFilterColumnKey(columnNum)}
                                  {...column}>
                  {this.getFilterColumn(column)}
                </GridHeaderColumn>
              ))
            }
          </GridRow>
        )
      )
    );
  }

  /**
   * @stable - 05.04.2018
   * @param {IEntity} entity
   * @param {number} columnNum
   * @returns {string}
   */
  private toFieldName(entity: IEntity, columnNum: number): string {
    return `$$dynamic-field-${entity.id}-${columnNum}`;   // Infinity scroll supporting
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
   * @stable - 05.04.2018
   * @returns {IGridColumnConfiguration[]}
   */
  private get columnsConfiguration(): IGridColumnConfiguration[] {
    return this.props.columnsConfiguration;
  }
}
