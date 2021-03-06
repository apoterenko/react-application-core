import * as React from 'react';

import {
  CalcUtils,
  ClsUtils,
  PropsUtils,
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
        <span className={SubHeaderClassesEnum.SECTION_TITLE}>
          {title}
        </span>
      );

    return (
      <div
        className={
          ClsUtils.joinClassName(
            SubHeaderClassesEnum.SUB_HEADER,
            subBorder && SubHeaderClassesEnum.SUB_BORDER
          )}>
        {navigationActionRendered && (
          <Button
            icon={IconsEnum.ARROW_LEFT}
            {...navigationActionConfiguration}
            className={ClsUtils.joinClassName(
              SubHeaderClassesEnum.NAVIGATION_ACTION,
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
   * @stable [01.07.2021]
   */
  protected getComponentSettingsProps(): ISubHeaderProps {
    return PropsUtils.extendProps(
      super.getComponentSettingsProps(),
      this.componentsSettings?.subHeader
    );
  }
}
