import * as React from 'react';

import {
  CalcUtils,
  ConditionUtils,
  NvlUtils,
  PropsUtils,
  TypeUtils,
} from '../../../util';
import { BaseGridColumn } from '../base-column';
import { IGridColumnProps } from '../../../definition';

export class GridColumn extends BaseGridColumn {

  public static readonly defaultProps: IGridColumnProps = {
    columnRendered: true,
  };

  /**
   * @stable [21.07.2020]
   * @param {IGridColumnProps} originalProps
   */
  constructor(originalProps: IGridColumnProps) {
    super(originalProps);

    this.onColumnClick = this.onColumnClick.bind(this);
    this.onColumnContentClick = this.onColumnContentClick.bind(this);
  }

  /**
   * @stable [21.07.2020]
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
            columnTitle || ConditionUtils.orUndef(
              TypeUtils.isPrimitive(originalChildren), () => String(originalChildren)
            )
          }
          {...PropsUtils.buildClickHandlerProps(this.onColumnClick, TypeUtils.isFn(onColumnClick), false)}
        >
          {this.columnContentElement}
        </td>
      )
    );
  }

  /**
   * @stable [21.07.2020]
   * @returns {React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>}
   */
  protected getColumnContentProps(): React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    const originalProps = this.originalProps;
    const {
      onColumnContentClick,
    } = originalProps;

    return {
      ...super.getColumnContentProps(),
      ...PropsUtils.buildClickHandlerProps(this.onColumnContentClick, TypeUtils.isFn(onColumnContentClick), false),
    };
  }

  /**
   * @stable [21.07.2020]
   */
  private onColumnClick(): void {
    const originalProps = this.originalProps;
    const {
      onColumnClick,
    } = originalProps;

    onColumnClick(originalProps);
  }

  /**
   * @stable [21.07.2020]
   */
  private onColumnContentClick(): void {
    const originalProps = this.originalProps;
    const {
      onColumnContentClick,
    } = originalProps;

    onColumnContentClick(originalProps);
  }
}
