import * as React from 'react';
import * as R from 'ramda';

import { IBasicEvent } from '../../../definitions.interface';
import { SortDirectionEnum } from '../../../entities-definitions.interface';
import { nvl, orUndef, orNull, cancelEvent } from '../../../util';
import { IGridHeaderColumnProps } from './grid-header-column.interface';
import { BaseGridColumn } from '../base-column';

export class GridHeaderColumn extends BaseGridColumn<GridHeaderColumn, IGridHeaderColumnProps> {

  /**
   * @stable [05.04.2018]
   * @param {IGridHeaderColumnProps} props
   */
  constructor(props: IGridHeaderColumnProps) {
    super(props);
    this.onHeaderColumnClick = this.onHeaderColumnClick.bind(this);
  }

  /**
   * @stable [05.04.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return orNull<JSX.Element>(
      props.headerRendered !== false,
      () => (
        <th style={this.getStyle({width: props.headerWidth})}
            colSpan={nvl(props.headerColSpan, props.colSpan)}
            className={this.getClassName(
              props.useSorting && 'rac-grid-sorted-column',
              'rac-no-user-select',
              props.headerClassName
            )}
            onClick={
              orUndef<(payload: IBasicEvent) => void>(props.useSorting, () => this.onHeaderColumnClick)
            }
        >
          {this.getColumnContentElement()}
          {
            orNull<JSX.Element>(
              props.useSorting,
              () => (
                this.uiFactory.makeIcon({
                  // Prevent text jumping
                  className: `rac-grid-column-direction ${R.isNil(props.direction) ? 'rac-visibility-hidden' : ''}`,
                  type: props.direction === SortDirectionEnum.ASC
                    ? 'arrow_downward'
                    : 'arrow_upward',
                })
              )
            )
          }
        </th>
      )
    );
  }

  /**
   * @stable - 05.04.2018
   * @param {IBasicEvent} event
   */
  private onHeaderColumnClick(event: IBasicEvent): void {
    cancelEvent(event);

    const props = this.props;

    if (props.onClick) {
      props.onClick({
        name: props.name,
        direction: props.direction === SortDirectionEnum.ASC
          ? SortDirectionEnum.DESC
          : SortDirectionEnum.ASC,
      });
    }
  }
}
