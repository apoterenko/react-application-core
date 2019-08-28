import * as React from 'react';
import * as R from 'ramda';

import { BaseComponent } from '../../base';
import { IBaseGridColumnProps } from './base-grid-column.interface';
import { toClassName, defValuesFilter, nvl, ifNotNilThanValue, isOddNumber } from '../../../util';
import { IStyleEntity } from '../../../entities-definitions.interface';

export class BaseGridColumn<TProps extends IBaseGridColumnProps>
  extends BaseComponent<TProps> {

  /**
   * @stable [10.09.2018]
   * @param {TProps} style
   * @returns {React.CSSProperties}
   */
  protected getStyle(style?: TProps): React.CSSProperties {
    const props = this.props;
    return defValuesFilter<IStyleEntity, IStyleEntity>({
      textAlign: nvl(style && style.align, props.align),
      width: nvl(style && style.width, props.width),
    }) as React.CSSProperties;
  }

  /**
   * @stable [15.09.2018]
   * @param {string} classNames
   * @returns {string}
   */
  protected getClassName(...classNames: string[]): string {
    const props = this.props;
    return toClassName(
      'rac-grid-column',
      ifNotNilThanValue(props.index, () => `rac-grid-column-${props.index}`),
      isOddNumber(props.index) ? 'rac-grid-column-odd' : '',
      props.align && `rac-grid-column-align-${props.align}`,
      props.className,
      ...classNames
    );
  }

  /**
   * @stable [10.09.2018]
   * @param {string} classNames
   * @returns {JSX.Element}
   */
  protected getColumnContentElement(...classNames: string[]): JSX.Element {
    const props = this.props;
    return (
      !R.isNil(props.children) && (
        <div className={toClassName('rac-grid-column-content', ...classNames)}>
          {props.children}
        </div>
      )
    );
  }
}
