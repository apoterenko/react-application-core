import * as React from 'react';

import { EnhancedGenericComponent } from '../../base/enhanced-generic.component';
import {
  CalcUtils,
  ClsUtils,
  fullFlexClassName,
  PropsUtils,
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
    const {
      alignItemsCenter,
      alignItemsEnd,
      alignItemsStart,
      alignItemsStretch,
      className,
      disabled,
      fullSize,
      justifyContentCenter,
      justifyContentEnd,
      justifyContentSpaceBetween,
      noShrink,
      onClick,
      row,
      style,
      title,
      touched,
      wrap,
    } = this.mergedProps;

    return (
      <div
        ref={this.actualRef}
        className={
          ClsUtils.joinClassName(
            CalcUtils.calc(className),
            FlexLayoutClassesEnum.FLEX,
            /**/
            alignItemsCenter && FlexLayoutClassesEnum.FLEX_ALIGN_ITEMS_CENTER,
            alignItemsEnd && FlexLayoutClassesEnum.FLEX_ALIGN_ITEMS_END,
            alignItemsStart && FlexLayoutClassesEnum.FLEX_ALIGN_ITEMS_START,
            alignItemsStretch && FlexLayoutClassesEnum.FLEX_ALIGN_ITEMS_STRETCH,
            fullSize && ComponentClassesEnum.FULL_SIZE,
            justifyContentCenter && FlexLayoutClassesEnum.FLEX_JUSTIFY_CONTENT_CENTER,
            justifyContentEnd && FlexLayoutClassesEnum.FLEX_JUSTIFY_CONTENT_END,
            justifyContentSpaceBetween && FlexLayoutClassesEnum.FLEX_JUSTIFY_CONTENT_SPACE_BETWEEN,
            noShrink && FlexLayoutClassesEnum.FLEX_NO_SHRINK,
            wrap && FlexLayoutClassesEnum.FLEX_WRAP,
            /**/
            row ? 'rac-flex-row' : 'rac-flex-column',
            /**/
            fullFlexClassName(this.props as any) // TODO
          )
        }
        title={title as string}
        style={style}
        {...PropsUtils.buildClickHandlerProps(onClick, !CalcUtils.calc(disabled), touched)}
      >
        {this.props.children}
      </div>
    );
  }
}
