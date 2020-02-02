import * as React from 'react';

import { UniversalComponent } from '../../base';
import {
  calc,
  defValuesFilter,
  ifNotNilThanValue,
  isEdited,
  isIndexed,
  isNumber,
  isOddNumber,
  isSortable,
  joinClassName,
  nvl,
} from '../../../util';
import { IGridColumnProps } from '../../../definition';

export class BaseGridColumn<TProps extends IGridColumnProps = IGridColumnProps>
  extends UniversalComponent<TProps> {

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
    const props = this.props;
    return joinClassName(
      'rac-grid-column',
      calc<string>(props.className),
      isIndexed(props) && isNumber(props.index) && `rac-grid-column-${props.index}`,
      isOddNumber(props.index) && 'rac-grid-column-odd',
      isEdited(props) && 'rac-grid-column-edited',
      isSortable(props) && 'rac-grid-column-sortable',
      props.align && `rac-grid-column-align-${props.align}`,
      ...classNames
    );
  }

  /**
   * @stable [04.01.2020]
   * @returns {JSX.Element}
   */
  protected get columnContentElement(): JSX.Element {
    return ifNotNilThanValue(
      this.props.children,
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
      className: 'rac-grid-column-content',
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
