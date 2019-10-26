import * as React from 'react';

import { UniversalComponent } from '../../base';
import {
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
      isIndexed(props) && isNumber(props.index) && `rac-grid-column-${props.index}`,
      isOddNumber(props.index) && 'rac-grid-column-odd',
      isEdited(props) && 'rac-grid-column-edited',
      isSortable(props) && 'rac-grid-column-sortable',
      props.align && `rac-grid-column-align-${props.align}`,
      props.className,
      ...classNames
    );
  }

  /**
   * @stable [26.10.2019]
   * @returns {JSX.Element}
   */
  protected get columnContentElement(): JSX.Element {
    return ifNotNilThanValue(
      this.props.children,
      (children) => (
        <div className='rac-grid-column-content'>
          {this.getColumnContentChildrenElement(children)}
        </div>
      )
    );
  }

  /**
   * @stable [22.10.2019]
   * @param {React.ReactNode} children
   * @returns {React.ReactNode}
   */
  protected getColumnContentChildrenElement(children: React.ReactNode): React.ReactNode {
    return children;
  }
}
