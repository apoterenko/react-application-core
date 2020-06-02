import * as React from 'react';

import {
  CalcUtils,
  ClsUtils,
} from '../../../util';
import { GenericComponent } from '../../base/generic.component';
import {
  IFormLayoutProps,
  LayoutClassesEnum,
} from '../../../definition';

/**
 * @component-impl
 * @stable [31.05.2020]
 */
export class FormLayout extends GenericComponent<IFormLayoutProps> {

  /**
   * @stable [31.05.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const {
      className,
      topTitle,
    } = this.mergedProps;

    return (
      <div className={
        ClsUtils.joinClassName(
          CalcUtils.calc(className),
          LayoutClassesEnum.FORM_LAYOUT
        )}>
        <div className={LayoutClassesEnum.FORM_LAYOUT_CONTENT}>
          {
            topTitle && (
              <div className={LayoutClassesEnum.FORM_LAYOUT_TOP_HEADER}>
                {this.t(topTitle)}
              </div>
            )
          }
          {this.props.children}
        </div>
      </div>
    );
  }

  /**
   * @stable [02.06.2020]
   * @returns {IFormLayoutProps}
   */
  protected get settingsProps(): IFormLayoutProps {
    return this.componentsSettings.formLayout;
  }
}
