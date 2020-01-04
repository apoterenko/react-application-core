import * as React from 'react';

import { UniversalComponent } from '../../base';
import {
  defValuesFilter,
  handlerPropsFactory,
  ifNotNilThanValue,
  isEdited,
  isFn,
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
   * @stable [04.01.2020]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.onColumnContentClick = this.onColumnContentClick.bind(this);
  }

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
   * @stable [04.01.2020]
   * @returns {JSX.Element}
   */
  protected get columnContentElement(): JSX.Element {
    const props = this.props;
    return ifNotNilThanValue(
      props.children,
      (children) => (
        <div
          className='rac-grid-column-content'
          {...handlerPropsFactory(this.onColumnContentClick, isFn(props.onColumnContentClick), false)}>
          {this.getColumnContentElement(children)}
        </div>
      )
    );
  }

  /**
   * @stable [04.01.2020]
   * @param {React.ReactNode} children
   * @returns {React.ReactNode}
   */
  protected getColumnContentElement(children: React.ReactNode): React.ReactNode {
    return children;
  }

  /**
   * @stable [04.01.2020]
   */
  private onColumnContentClick(): void {
    const props = this.props;
    props.onColumnContentClick(props);
  }
}
