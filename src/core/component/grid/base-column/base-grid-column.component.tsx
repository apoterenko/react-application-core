import * as React from 'react';

import { GenericBaseComponent } from '../../base/generic-base.component';
import {
  defValuesFilter,
  ifNotNilThanValue,
  isEdited,
  isOddNumber,
  isSortable,
  joinClassName,
  nvl,
  CalcUtils,
  TypeUtils,
} from '../../../util';
import {
  GridClassesEnum,
  IGridColumnProps,
} from '../../../definition';

export class BaseGridColumn<TProps extends IGridColumnProps = IGridColumnProps>
  extends GenericBaseComponent<TProps> {

  /**
   * @stable [17.10.2019]
   * @param {TProps} style
   * @returns {React.CSSProperties}
   */
  protected getStyle(style?: TProps): React.CSSProperties {
    return defValuesFilter<React.CSSProperties, React.CSSProperties>({
      width: nvl(style && style.width, this.props.width),
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
      className,
      index,
      indexed,
    } = originalProps;

    return joinClassName(
      GridClassesEnum.GRID_COLUMN,
      CalcUtils.calc<string>(className),
      align && `rac-grid-column-align-${align}`,
      indexed && TypeUtils.isNumber(index) && `rac-grid-column-${index}`,
      isEdited(originalProps) && 'rac-grid-column-edited',
      isOddNumber(originalProps.index) && 'rac-grid-column-odd',
      isSortable(originalProps) && 'rac-grid-column-sortable',
      ...classNames
    );
  }

  /**
   * @stable [04.01.2020]
   * @returns {JSX.Element}
   */
  protected get columnContentElement(): JSX.Element {
    return ifNotNilThanValue(
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
