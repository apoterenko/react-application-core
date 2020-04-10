import * as React from 'react';

import { EnhancedGenericComponent } from '../../base/enhanced-generic.component';
import {
  calc,
  fullFlexClassName,
  handlerPropsFactory,
  joinClassName,
} from '../../../util';
import {
  ComponentClassesEnum,
  IFlexLayoutProps,
} from '../../../definition';

export class FlexLayout extends EnhancedGenericComponent<IFlexLayoutProps> {

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
            calc(props.className),
            /**/
            props.inline ? 'rac-inline-flex' : 'rac-flex',
            props.row ? 'rac-flex-row' : 'rac-flex-column',
            /**/
            fullFlexClassName(props as any), // TODO
            props.fullSize && ComponentClassesEnum.FULL_SIZE,
            /**/
            props.wrap && 'rac-flex-wrap',
            props.alignItemsCenter && 'rac-flex-align-items-center',
            props.alignItemsEnd && 'rac-flex-align-items-end',
            props.justifyContentCenter && 'rac-flex-justify-content-center',
            props.justifyContentEnd && 'rac-flex-justify-content-end',
            props.justifyContentSpaceBetween && 'rac-flex-justify-content-space-between'
          )
        }
        title={props.title as string}
        style={props.style}
        {...handlerPropsFactory(props.onClick, !calc(props.disabled), props.touched)}
      >
        {props.children}
      </div>
    );
  }
}
