import * as React from 'react';

import {
  IGridColumnProps,
  SortDirectionsEnum,
} from '../../../definition';
import {
  calc,
  ifNotFalseThanValue,
  isFn,
  joinClassName,
  nvl,
  orNull,
} from '../../../util';
import { BaseGridColumn } from '../base-column';

export class GridHeaderColumn extends BaseGridColumn {

  /**
   * @stable [17.10.2019]
   * @param {IGridColumnProps} props
   */
  constructor(props: IGridColumnProps) {
    super(props);
    this.onChangeAscSortingActionClick = this.onChangeAscSortingActionClick.bind(this);
    this.onChangeDescSortingActionClick = this.onChangeDescSortingActionClick.bind(this);
  }

  /**
   * @stable [17.10.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return ifNotFalseThanValue(
      props.headerRendered,
      () => (
        <th
          style={{
            ...this.styles,
            ...calc(props.headerStyles, props),
          }}
          colSpan={nvl(props.headerColSpan, props.colSpan)}
          className={this.getClassName(calc(props.headerClassName, props), 'rac-no-user-select')}>
          {this.columnContentElement}
        </th>
      )
    );
  }

  /**
   * @stable [22.10.2019]
   * @param {React.ReactNode} children
   * @returns {React.ReactNode}
   */
  protected getColumnContentElement(children: React.ReactNode): React.ReactNode {
    return (
      <React.Fragment>
        {
          this.props.sortable && (
            <div className='rac-grid-column-sort'>
              {
                this.uiFactory.makeIcon({
                  key: 'desc-sort-icon-key',
                  className: joinClassName(
                    'rac-grid-column-sort-icon',
                    'rac-grid-column-sort-desc-action',
                    this.isDescSortingEnabled && 'rac-grid-column-active-sort-icon'
                  ),
                  type: 'bottom',
                  onClick: this.onChangeDescSortingActionClick,
                })
              }
              {
                this.uiFactory.makeIcon({
                  key: 'asc-sort-icon-key',
                  className: joinClassName(
                    'rac-grid-column-sort-icon',
                    'rac-grid-column-sort-asc-action',
                    this.isAscSortingEnabled && 'rac-grid-column-active-sort-icon'
                  ),
                  type: 'top',
                  onClick: this.onChangeAscSortingActionClick,
                })
              }
            </div>
          )
        }
        {children}
      </React.Fragment>
    );
  }

  /**
   * @stable [18.10.2019]
   */
  private onChangeAscSortingActionClick(): void {
    this.doSortingDirectionChange(orNull(!this.isAscSortingEnabled, SortDirectionsEnum.ASC));
  }

  /**
   * @stable [18.10.2019]
   */
  private onChangeDescSortingActionClick(): void {
    this.doSortingDirectionChange(orNull(!this.isDescSortingEnabled, SortDirectionsEnum.DESC));
  }

  /**
   * @stable [18.10.2019]
   * @param {SortDirectionsEnum} direction
   */
  private doSortingDirectionChange(direction: SortDirectionsEnum): void {
    const props = this.props;
    if (isFn(props.onSortingDirectionChange)) {
      props.onSortingDirectionChange({name: props.name, direction});
    }
  }

  /**
   * @stable [18.10.2019]
   * @returns {boolean}
   */
  private get isDescSortingEnabled(): boolean {
    return this.props.direction === SortDirectionsEnum.DESC;
  }

  /**
   * @stable [18.10.2019]
   * @returns {boolean}
   */
  private get isAscSortingEnabled(): boolean {
    return this.props.direction === SortDirectionsEnum.ASC;
  }

  /**
   * @stable [18.10.2019]
   * @returns {React.CSSProperties}
   */
  private get styles(): React.CSSProperties {
    return this.getStyle({width: this.props.headerWidth});
  }
}
