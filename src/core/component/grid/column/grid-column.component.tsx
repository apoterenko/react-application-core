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
   * @stable [12.12.2020]
   * @param originalProps
   */
  constructor(originalProps: IGridColumnProps) {
    super(originalProps);

    this.onColumnClick = this.onColumnClick.bind(this);
    this.onColumnContentClick = this.onColumnContentClick.bind(this);
  }

  /**
   * @stable [12.12.2020]
   */
  public render(): JSX.Element {
    const originalProps = this.originalProps;
    const originalChildren = this.originalChildren;
    const {
      colSpan,
      columnClassName,
      columnColSpan,
      columnRendered,
      columnTitle,
      onColumnClick,
    } = originalProps;

    return ConditionUtils.orNull(
      columnRendered,
      () => (
        <td
          style={this.styles}
          colSpan={NvlUtils.nvl(columnColSpan, colSpan)}
          className={this.getClassName(CalcUtils.calc(columnClassName, originalProps))}
          title={
            columnTitle ||
            ConditionUtils.orUndef(TypeUtils.isPrimitive(originalChildren), () => String(originalChildren))
          }
          {...PropsUtils.buildClickHandlerProps(this.onColumnClick, TypeUtils.isFn(onColumnClick), false)}
        >
          {this.columnContentElement}
        </td>
      )
    );
  }

  /**
   * @stable [09.12.2020]
   * @protected
   */
  protected getColumnContentProps(): React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    const {
      onColumnContentClick,
    } = this.originalProps;

    return {
      ...super.getColumnContentProps(),
      ...PropsUtils.buildClickHandlerProps(this.onColumnContentClick, TypeUtils.isFn(onColumnContentClick), false),
    };
  }

  /**
   * @stable [09.12.2020]
   * @private
   */
  private onColumnClick(): void {
    const originalProps = this.originalProps;
    const {
      onColumnClick,
    } = originalProps;

    onColumnClick(originalProps);
  }

  /**
   * @stable [09.12.2020]
   * @private
   */
  private onColumnContentClick(): void {
    const originalProps = this.originalProps;
    const {
      onColumnContentClick,
    } = originalProps;

    onColumnContentClick(originalProps);
  }

  /**
   * @stable [09.12.2020]
   */
  private get styles(): React.CSSProperties {
    const originalProps = this.originalProps;
    const {
      columnStyle,
      columnWidth,
    } = originalProps;

    return this.getStyle({
      width: columnWidth,
      ...CalcUtils.calc(columnStyle, originalProps),
    });
  }
}
