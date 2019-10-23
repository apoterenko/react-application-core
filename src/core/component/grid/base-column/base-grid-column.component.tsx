import * as React from 'react';
import * as R from 'ramda';

import { UniversalComponent } from '../../base';
import {
  defValuesFilter,
  ifNotNilThanValue,
  isOddNumber,
  joinClassName,
  nvl,
} from '../../../util';
import { IGridColumnProps } from '../../../definition';
import { UNDEF_SYMBOL } from '../../../definitions.interface';
import { FlexLayout } from '../../layout';

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
      props.indexed === true && !R.isNil(props.index) && `rac-grid-column-${props.index}`,
      isOddNumber(props.index) && 'rac-grid-column-odd',
      props.align && `rac-grid-column-align-${props.align}`,
      props.className,
      ...classNames
    );
  }

  /**
   * @stable [18.10.2019]
   * @param {string} classNames
   * @returns {JSX.Element}
   */
  protected getColumnContentElement(...classNames: string[]): JSX.Element {
    return ifNotNilThanValue(
      this.props.children,
      (children) => (
        <FlexLayout
          row={this.props.sortable === true}
          className={joinClassName('rac-grid-column-content', ...classNames)}>
          {this.getColumnContentChildrenElement(children)}
        </FlexLayout>
      ),
      UNDEF_SYMBOL
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
