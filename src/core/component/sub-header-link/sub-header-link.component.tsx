import * as React from 'react';

import { GenericComponent } from '../base/generic.component';
import {
  ISubHeaderLinkProps,
  SubHeaderLinkClasses,
} from '../../definition';
import {
  ClsUtils,
  ConditionUtils,
  NvlUtils,
  PropsUtils,
} from '../../util';

/**
 * @component-impl
 * @stable [22.05.2020]
 */
export class SubHeaderLink extends GenericComponent<ISubHeaderLinkProps> {

  public static readonly defaultProps: ISubHeaderLinkProps = {
    separator: ' / ',
  };

  /**
   * @stable [24.09.2020]
   */
  public render(): JSX.Element {
    const {
      first,
      hasPrevious,
      last,
      onClick,
      separator,
      text,
    } = this.originalProps;

    const isActiveLink = !last && !first;
    const contentElement = NvlUtils.nvl(text, this.originalChildren);

    return ConditionUtils.ifNotEmptyThanValue(
      contentElement,
      () => (
        <span
          ref={this.actualRef}
          className={
            ClsUtils.joinClassName(
              SubHeaderLinkClasses.SUB_HEADER_LINK,
              isActiveLink && SubHeaderLinkClasses.SUB_HEADER_LINK_ACTIVE
            )
          }
        >
          {hasPrevious && separator}
          <span
            className={SubHeaderLinkClasses.SUB_HEADER_LINK_CONTENT}
            {...isActiveLink && PropsUtils.buildClickHandlerProps(onClick, true, false)}
          >
            {contentElement}
          </span>
        </span>
      )
    );
  }

  /**
   * @stable [24.09.2020]
   */
  protected get componentsSettingsProps(): ISubHeaderLinkProps {
    return this.componentsSettings.subHeaderLink;
  }
}
