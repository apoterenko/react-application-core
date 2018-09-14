import * as React from 'react';

import { toClassName } from '../../../util';
import { BaseComponent } from '../../base';
import { IFlexLayoutProps } from './flex-layout.interface';

export class FlexLayout extends BaseComponent<FlexLayout, IFlexLayoutProps> {

  public static defaultProps: IFlexLayoutProps = {
    full: true,
  };

  /**
   * @stable [17.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
        <div className={toClassName(
                            'rac-flex',
                            props.full && 'rac-flex-full',
                            props.row ? 'rac-flex-row' : 'rac-flex-column',
                            props.className,
                        )}
             style={props.style}>
          {props.children}
        </div>
    );
  }
}
