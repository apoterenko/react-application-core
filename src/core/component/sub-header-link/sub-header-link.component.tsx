import * as React from 'react';

import { GenericComponent } from '../base/generic.component';
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
export class SubHeaderLink extends GenericComponent<ISubHeaderLinkProps> {

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
        <span
          ref={this.actualRef}
          className={
            ClsUtils.joinClassName(
              SubHeaderLinkClasses.SUB_HEADER_LINK,
              isActiveLink && SubHeaderLinkClasses.SUB_HEADER_LINK_ACTIVE
            )
          }
        >
          {!first && separator}
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
   * @stable [02.06.2020]
   * @returns {ISubHeaderLinkProps}
   */
  protected get componentsSettingsProps(): ISubHeaderLinkProps {
    return this.componentsSettings.subHeaderLink;
  }
}
