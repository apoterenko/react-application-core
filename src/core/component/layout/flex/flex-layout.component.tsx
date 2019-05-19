import * as React from 'react';

import { toClassName } from '../../../util';
import { BaseComponent } from '../../base';
import { IFlexLayoutProps } from './flex-layout.interface';

export class FlexLayout extends BaseComponent<IFlexLayoutProps> {

  /**
   * @stable [17.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
        <div ref='self'
             className={toClassName(
                            props.className,
                            'rac-flex',
                            props.fullSize && 'rac-full-size',
                            props.row ? 'rac-flex-row' : 'rac-flex-column',
                            (props.full !== false && !(props.className || '').includes('rac-flex-')) && 'rac-flex-full',
                            props.overflow && 'rac-flex-overflow',
                            props.overflowMinContentHeight && 'rac-flex-overflow-min-content-height',
                            props.separator && 'rac-flex-separator',
                            props.alignItemsCenter && 'rac-flex-align-items-center',
                            props.alignItemsEnd && 'rac-flex-align-items-end',
                            props.justifyContentCenter && 'rac-flex-justify-content-center',
                            props.justifyContentEnd && 'rac-flex-justify-content-end',
                            props.justifyContentSpaceBetween && 'rac-flex-justify-content-space-between',
                            props.justifyContentSpaceEvenly && 'rac-flex-justify-content-space-evenly',
                            props.wrap && 'rac-flex-wrap',
                            props.noShrink && 'rac-flex-no-shrink'
                        )}
             title={props.title}
             style={props.style}
             onClick={props.onClick}>
          {props.children}
        </div>
    );
  }
}
