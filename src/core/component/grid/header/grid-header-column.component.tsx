import * as React from 'react';

import {
  IGridColumnProps,
  SortDirectionsEnum,
} from '../../../definition';
import {
  calc,
  ifNotFalseThanValue,
  isFn,
  nvl,
  orNull,
} from '../../../util';
import { BaseGridColumn } from '../base-column';
import { FlexLayout } from '../../layout';

export class GridHeaderColumn extends BaseGridColumn {

  /**
   * @stable [17.10.2019]
   * @param {IGridColumnProps} props
   */
  constructor(props: IGridColumnProps) {
    super(props);
    this.onChangeSortingTopActionClick = this.onChangeSortingTopActionClick.bind(this);
    this.onChangeSortingBottomActionClick = this.onChangeSortingBottomActionClick.bind(this);
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
            ...this.getStyle({width: props.headerWidth}),
            ...calc(props.headerStyles, props),
          }}
          colSpan={nvl(props.headerColSpan, props.colSpan)}
          className={this.getClassName(
            calc(props.headerClassName, props),
            'rac-no-user-select'
          )}>
          {this.headerContentElement}
        </th>
      )
    );
  }

  /**
   * @stable [17.10.2019]
   * @returns {JSX.Element}
   */
  private get headerContentElement(): JSX.Element {
    const props = this.props;
    return (
      <FlexLayout
        row={true}
        alignItemsCenter={true}
        justifyContentCenter={true}
      >
        {this.getColumnContentElement()}
        {
          props.sortable && (
            <React.Fragment>
              {
                this.uiFactory.makeIcon({
                  key: 'bottom-sort-icon-key',
                  className: 'rac-grid-column-sort-icon rac-grid-column-sort-bottom-action',
                  type: 'bottom',
                  onClick: this.onChangeSortingBottomActionClick,
                })
              }
              {
                this.uiFactory.makeIcon({
                  key: 'top-sort-icon-key',
                  className: 'rac-grid-column-sort-icon rac-grid-column-sort-top-action',
                  type: 'top',
                  onClick: this.onChangeSortingTopActionClick,
                })
              }
            </React.Fragment>
          )
        }
      </FlexLayout>
    );
  }

  /**
   * @stable [18.10.2019]
   */
  private onChangeSortingTopActionClick(): void {
    this.doSortingDirectionChange(
      orNull(this.props.direction !== SortDirectionsEnum.ASC, SortDirectionsEnum.ASC)
    );
  }

  /**
   * @stable [18.10.2019]
   */
  private onChangeSortingBottomActionClick(): void {
    this.doSortingDirectionChange(
      orNull(this.props.direction !== SortDirectionsEnum.DESC, SortDirectionsEnum.DESC)
    );
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
}
