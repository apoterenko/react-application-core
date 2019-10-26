import * as React from 'react';

import {
  calc,
  handlerPropsFactory,
  ifNotFalseThanValue,
  isFn,
  isPrimitive,
  nvl,
  orUndef,
} from '../../../util';
import { BaseGridColumn } from '../base-column';
import { IGridColumnProps } from '../../../definition';

export class GridColumn extends BaseGridColumn {

  /**
   * @stable [18.10.2019]
   * @param {IGridColumnProps} props
   */
  constructor(props: IGridColumnProps) {
    super(props);
    this.onColumnClick = this.onColumnClick.bind(this);
  }

  /**
   * @stable [18.10.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const children = props.children;

    return ifNotFalseThanValue(
      props.columnRendered,
      () => (
        <td
          style={{
            ...this.getStyle({width: props.columnWidth}),
            ...calc(props.columnStyles, props),
          }}
          colSpan={nvl(props.columnColSpan, props.colSpan)}
          className={this.getClassName(calc(props.columnClassName, props))}
          title={props.columnTitle || orUndef(isPrimitive(children), () => String(children))}
          {...handlerPropsFactory(this.onColumnClick, isFn(props.onColumnClick))}
        >
          {this.columnContentElement}
        </td>
      )
    );
  }

  /**
   * @stable [18.10.2019]
   */
  private onColumnClick(): void {
    const props = this.props;
    props.onColumnClick(props);
  }
}
