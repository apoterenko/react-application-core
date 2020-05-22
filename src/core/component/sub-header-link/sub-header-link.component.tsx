import * as React from 'react';

import { GenericBaseComponent } from '../base/generic-base.component';
import {
  ISubHeaderLinkProps,
  SubHeaderLinkClasses,
} from '../../definition';
import {
  ClsUtils,
  ConditionUtils,
  PropsUtils,
} from '../../util';

/**
 * @component-impl
 * @stable [22.05.2020]
 */
export class SubHeaderLink extends GenericBaseComponent<ISubHeaderLinkProps> {

  public static readonly defaultProps: ISubHeaderLinkProps = {
    separator: ' / ',
  };

  /**
   * @stable [22.05.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const {
      first,
      last,
      onClick,
      separator,
      text,
    } = this.mergedProps;

    const isActiveLink = !last && !first;
    const contentElement = text || this.props.children;

    return ConditionUtils.ifNotEmptyThanValue(
      contentElement,
      () => (
        <span>
          {!first && separator}
          <span
            className={
              ClsUtils.joinClassName(
                SubHeaderLinkClasses.SUB_HEADER_LINK,
                isActiveLink && SubHeaderLinkClasses.SUB_HEADER_LINK_ACTIVE
              )
            }
            {...isActiveLink && PropsUtils.buildClickHandlerProps(onClick, true, false)}
          >
            {contentElement}
          </span>
        </span>
      )
    );
  }

  /**
   * @stable [22.05.2020]
   * @returns {ISubHeaderLinkProps}
   */
  private get mergedProps(): ISubHeaderLinkProps {
    return PropsUtils.mergeWithSystemProps(this.originalProps, this.componentsSettings.subHeaderLink);
  }
}
