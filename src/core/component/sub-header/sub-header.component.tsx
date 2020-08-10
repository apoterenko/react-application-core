import * as React from 'react';

import {
  CalcUtils,
  ClsUtils,
  TypeUtils,
} from '../../util';
import { Button } from '../button';
import { GenericComponent } from '../base/generic.component';
import {
  IconsEnum,
  ISubHeaderProps,
  SubHeaderClassesEnum,
} from '../../definition';

/**
 * @component-impl
 * @stable [22.05.2020]
 */
export class SubHeader extends GenericComponent<ISubHeaderProps> {

  /**
   * @stable [22.05.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const mergedProps = this.mergedProps;
    const {
      items,
      navigationActionConfiguration = {},
      navigationActionRendered,
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
            subBorder && SubHeaderClassesEnum.SUB_HEADER_SUB_BORDER
          )}>
        {navigationActionRendered && (
          <Button
            icon={IconsEnum.ARROW_LEFT}
            {...navigationActionConfiguration}
            className={ClsUtils.joinClassName(
              SubHeaderClassesEnum.SUB_HEADER_NAVIGATION_ACTION,
              CalcUtils.calc(navigationActionConfiguration.className)
            )}/>
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
   * @stable [02.06.2020]
   * @returns {ISubHeaderProps}
   */
  protected get componentsSettingsProps(): ISubHeaderProps {
    return this.componentsSettings.subHeader;
  }
}
