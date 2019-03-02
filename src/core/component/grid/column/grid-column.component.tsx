import * as React from 'react';
import * as R from 'ramda';

import { orUndef, isPrimitive, nvl, ifNotFalseThanValue, calc } from '../../../util';
import { IGridColumnProps } from '../../../props-definitions.interface';
import { BaseGridColumn } from '../base-column/base-grid-column.component';
import { IBasicEvent } from '../../../react-definitions.interface';

export class GridColumn extends BaseGridColumn<IGridColumnProps> {

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

    return ifNotFalseThanValue(
      props.columnRendered,
      () => (
        <td
          style={{
            ...this.getStyle({width: props.columnWidth}),
            ...calc(props.columnStyle, props),
          }}
          colSpan={nvl(props.columnColSpan, props.colSpan)}
          className={this.getClassName(calc(props.columnClassName, props))}
          title={
            orUndef<string>(
              !R.isNil(props.columnTitle) || isPrimitive(props.children),
              () => R.isNil(props.columnTitle) ? props.children as string : props.columnTitle
            )
          }
          onClick={props.onColumnClick && this.onColumnClick}
        >
          {this.getColumnContentElement()}
        </td>
      )
    );
  }

  /**
   * @stable [10.09.2018]
   * @param {IBasicEvent} event
   */
  private onColumnClick(event: IBasicEvent): void {
    const props = this.props;
    props.onColumnClick({event, props});
  }
}
