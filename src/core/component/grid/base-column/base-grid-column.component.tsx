import * as React from 'react';

import { GenericComponent } from '../../base/generic.component';
import {
  ClsUtils,
  ConditionUtils,
  FilterUtils,
  isEdited,
  NumberUtils,
  NvlUtils,
  TypeUtils,
} from '../../../util';
import {
  GridClassesEnum,
  IGridColumnProps,
} from '../../../definition';

export class BaseGridColumn<TProps extends IGridColumnProps = IGridColumnProps>
  extends GenericComponent<TProps> {

  /**
   * @stable [28.07.2020]
   * @param style
   */
  protected getStyle(style?: TProps): React.CSSProperties {
    return FilterUtils.defValuesFilter<React.CSSProperties, React.CSSProperties>({
      width: NvlUtils.nvl(style && style.width, this.originalProps.width),
    });
  }

  /**
   * @stable [18.10.2019]
   * @param {string} classNames
   * @returns {string}
   */
  protected getClassName(...classNames: string[]): string {
    const originalProps = this.originalProps;
    const {
      align,
      index,
      indexed,
    } = originalProps;

    return ClsUtils.joinClassName(
      GridClassesEnum.GRID_COLUMN,
      align && `rac-grid-column-align-${align}`,
      indexed && TypeUtils.isNumber(index) && `rac-grid-column-${index}`,
      isEdited(originalProps) && 'rac-grid-column-edited',
      NumberUtils.isOddNumber(index) && 'rac-grid-column-odd',
      this.isActionable() && 'rac-grid-column-actionable',
      ...classNames
    );
  }

  /**
   * @stable [26.11.2020]
   * @protected
   */
  protected isActionable(): boolean {
    const {
      sortable,
    } = this.originalProps;

    return sortable;
  }

  /**
   * @stable [04.01.2020]
   * @returns {JSX.Element}
   */
  protected get columnContentElement(): JSX.Element {
    return ConditionUtils.ifNotNilThanValue(
      this.originalChildren,
      (children) => (
        <div {...this.getColumnContentProps()}>
          {this.getColumnContentElement(children)}
        </div>
      )
    );
  }

  /**
   * @stable [04.01.2020]
   * @returns {React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>}
   */
  protected getColumnContentProps(): React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    return {
      className: GridClassesEnum.GRID_COLUMN_CONTENT,
    };
  }

  /**
   * @stable [04.01.2020]
   * @param {React.ReactNode} children
   * @returns {React.ReactNode}
   */
  protected getColumnContentElement(children: React.ReactNode): React.ReactNode {
    return children;
  }
}
