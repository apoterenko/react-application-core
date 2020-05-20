import * as React from 'react';

import {
  ClsUtils,
  PropsUtils,
  TypeUtils,
} from '../../util';
import { Button } from '../button';
import { GenericBaseComponent } from '../base/generic-base.component';
import {
  IconsEnum,
  ISubHeaderProps,
  SubHeaderClassesEnum,
} from '../../definition';

/**
 * @component-impl
 * @stable [20.05.2020]
 */
export class SubHeader extends GenericBaseComponent<ISubHeaderProps> {

  public static readonly defaultProps: ISubHeaderProps = {
    navigationActionIcon: IconsEnum.BACK,
  };

  /**
   * @stable [20.05.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const mergedProps = this.mergedProps;
    const {
      items,
      navigationActionIcon,
      navigationActionRendered,
      onNavigationActionClick,
      subBorder,
      title,
      titleRenderer,
    } = mergedProps;

    const headerTitleElement = title === false
      ? null
      : (
        <span className={SubHeaderClassesEnum.SUB_HEADER_SECTION_TITLE}>
          {title}
        </span>
      );

    return (
      <div
        className={
          ClsUtils.joinClassName(
            SubHeaderClassesEnum.SUB_HEADER,
            subBorder && SubHeaderClassesEnum.SUB_HEADER_SUB_BORDER,
            navigationActionRendered && SubHeaderClassesEnum.SUB_HEADER_NAVIGATIONAL
          )}>
        {navigationActionRendered && (
          <Button
            icon={navigationActionIcon}
            onClick={onNavigationActionClick}
            className={SubHeaderClassesEnum.SUB_HEADER_NAVIGATIONAL_ACTION}/>
        )}
        {
          TypeUtils.isFn(titleRenderer)
            ? titleRenderer(headerTitleElement)
            : headerTitleElement
        }
        {items}
      </div>
    );
  }

  /**
   * @stable [20.05.2020]
   * @returns {ISubHeaderProps}
   */
  private get mergedProps(): ISubHeaderProps {
    return PropsUtils.mergeWithSystemProps(this.props, this.settings.components.subHeader);
  }
}
