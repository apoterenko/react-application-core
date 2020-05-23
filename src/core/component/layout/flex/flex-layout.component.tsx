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
  FlexLayoutClassesEnum,
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
            FlexLayoutClassesEnum.FLEX,
            props.alignItemsCenter && FlexLayoutClassesEnum.FLEX_ALIGN_ITEMS_CENTER,
            props.alignItemsEnd && FlexLayoutClassesEnum.FLEX_ALIGN_ITEMS_END,
            props.alignItemsStretch && FlexLayoutClassesEnum.FLEX_ALIGN_ITEMS_STRETCH,
            props.fullSize && ComponentClassesEnum.FULL_SIZE,
            props.justifyContentCenter && FlexLayoutClassesEnum.FLEX_JUSTIFY_CONTENT_CENTER,
            props.justifyContentEnd && FlexLayoutClassesEnum.FLEX_JUSTIFY_CONTENT_END,
            props.noShrink && FlexLayoutClassesEnum.FLEX_NO_SHRINK,
            props.wrap && FlexLayoutClassesEnum.FLEX_WRAP,
            /**/
            props.row ? 'rac-flex-row' : 'rac-flex-column',
            /**/
            fullFlexClassName(props as any), // TODO
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
