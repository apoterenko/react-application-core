import * as React from 'react';

import { BaseComponent } from '../../base/base.component';
import { IFlexLayoutProps } from './flex-layout.interface';
import { joinClassName, handlerPropsFactory, fullFlexClassName, calc } from '../../../util';

export class FlexLayout extends BaseComponent<IFlexLayoutProps> {

  /**
   * @stable [11.09.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
      <div
        ref={this.selfRef}
        className={
          joinClassName(
            props.className,
            /**/
            props.inline ? 'rac-inline-flex' : 'rac-flex',
            props.row ? 'rac-flex-row' : 'rac-flex-column',
            /**/
            fullFlexClassName(props),
            props.fullSize && 'rac-full-size',
            props.noShrink && 'rac-flex-no-shrink',
            /**/
            props.wrap && 'rac-flex-wrap',
            props.alignItemsCenter && 'rac-flex-align-items-center',
            props.alignItemsEnd && 'rac-flex-align-items-end',
            props.justifyContentCenter && 'rac-flex-justify-content-center',
            props.justifyContentEnd && 'rac-flex-justify-content-end',
            props.justifyContentSpaceBetween && 'rac-flex-justify-content-space-between',
            /**/
            props.separator && 'rac-flex-separator'      // TODO Deprecated
          )
        }
        title={props.title}
        style={props.style}
        {...handlerPropsFactory(props.onClick, !calc(props.disabled), props.touched)}
      >
        {props.children}
      </div>
    );
  }
}
