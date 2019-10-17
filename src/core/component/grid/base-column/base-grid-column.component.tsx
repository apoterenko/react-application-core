import * as React from 'react';

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

export class BaseGridColumn<TProps extends IGridColumnProps = IGridColumnProps>
  extends UniversalComponent<TProps> {

  /**
   * @stable [17.10.2019]
   * @param {TProps} style
   * @returns {React.CSSProperties}
   */
  protected getStyle(style?: TProps): React.CSSProperties {
    const props = this.props;
    return defValuesFilter<React.CSSProperties, React.CSSProperties>({
      textAlign: style && style.align || props.align,
      width: nvl(style && style.width, props.width),
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
      ifNotNilThanValue(props.index, () => `rac-grid-column-${props.index}`),
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
        <div className={joinClassName('rac-grid-column-content', ...classNames)}>
          {children}
        </div>
      ),
      UNDEF_SYMBOL
    );
  }
}
