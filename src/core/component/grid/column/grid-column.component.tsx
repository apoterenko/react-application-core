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
    this.onColumnContentClick = this.onColumnContentClick.bind(this);
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
          {...handlerPropsFactory(this.onColumnClick, isFn(props.onColumnClick), false)}
        >
          {this.columnContentElement}
        </td>
      )
    );
  }

  /**
   * @stable [04.01.2020]
   * @returns {React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>}
   */
  protected getColumnContentProps(): React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    const props = this.props;
    return {
      ...super.getColumnContentProps(),
      ...handlerPropsFactory(this.onColumnContentClick, isFn(props.onColumnContentClick), false),
    };
  }

  /**
   * @stable [18.10.2019]
   */
  private onColumnClick(): void {
    const props = this.props;
    props.onColumnClick(props);
  }

  /**
   * @stable [04.01.2020]
   */
  private onColumnContentClick(): void {
    const props = this.props;
    props.onColumnContentClick(props);
  }
}
