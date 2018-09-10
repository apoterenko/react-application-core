import * as React from 'react';
import * as R from 'ramda';

import { orUndef, isPrimitive, nvl, isFn, cancelEvent } from '../../../util';
import { IGridColumnProps } from '../../../props-definitions.interface';
import { BaseGridColumn } from '../base-column/base-grid-column.component';
import { IBasicEvent } from '../../../definitions.interface';

export class GridColumn extends BaseGridColumn<GridColumn, IGridColumnProps> {

  /**
   * @stable [10.09.2018]
   * @param {IGridColumnProps} props
   */
  constructor(props: IGridColumnProps) {
    super(props);
    this.onColumnClick = this.onColumnClick.bind(this);
  }

  /**
   * @stable [10.09.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
      <td style={this.getStyle({width: props.columnWidth})}
          colSpan={nvl(props.columnColSpan, props.colSpan)}
          className={this.getClassName(
            props.actioned && 'rac-grid-actioned-column',
            isFn(props.columnClassName)
              ? (props.columnClassName as (props: IGridColumnProps) => string)(props)
              : props.columnClassName as string,
          )}
          title={
            orUndef<string>(
              !R.isNil(props.columnTitle) || isPrimitive(props.children),
              () => R.isNil(props.columnTitle) ? props.children as string : props.columnTitle
            )
          }
          onClick={
            orUndef<(payload: IBasicEvent) => void>(isFn(props.onColumnClick), () => this.onColumnClick)
          }>
        {this.getColumnContentElement('rac-overflow-ellipsis')}
      </td>
    );
  }

  /**
   * @stable [10.09.2018]
   * @param {IBasicEvent} event
   */
  private onColumnClick(event: IBasicEvent): void {
    cancelEvent(event);

    const props = this.props;
    props.onColumnClick(props);
  }
}
