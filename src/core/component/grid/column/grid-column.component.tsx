import * as React from 'react';

import {
  CalcUtils,
  ConditionUtils,
  handlerPropsFactory,
  NvlUtils,
  orUndef,
  TypeUtils,
} from '../../../util';
import { BaseGridColumn } from '../base-column';
import { IGridColumnProps } from '../../../definition';

export class GridColumn extends BaseGridColumn {

  public static readonly defaultProps: IGridColumnProps = {
    columnRendered: true,
  };

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
    const originalProps = this.originalProps;
    const originalChildren = this.originalChildren;
    const {
      colSpan,
      columnClassName,
      columnColSpan,
      columnRendered,
      columnStyles,
      columnTitle,
      columnWidth,
      onColumnClick,
    } = originalProps;

    return ConditionUtils.orNull(
      columnRendered,
      () => (
        <td
          style={{
            ...this.getStyle({width: columnWidth}),
            ...CalcUtils.calc(columnStyles, originalProps),
          }}
          colSpan={NvlUtils.nvl(columnColSpan, colSpan)}
          className={this.getClassName(CalcUtils.calc(columnClassName, originalProps))}
          title={
            columnTitle || orUndef(TypeUtils.isPrimitive(originalChildren), () => String(originalChildren))
          }
          {...handlerPropsFactory(this.onColumnClick, TypeUtils.isFn(onColumnClick), false)}
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
      ...handlerPropsFactory(this.onColumnContentClick, TypeUtils.isFn(props.onColumnContentClick), false),
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
