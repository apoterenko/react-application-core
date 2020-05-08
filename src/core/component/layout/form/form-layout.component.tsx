import * as React from 'react';

import {
  calc,
  joinClassName,
} from '../../../util';
import { GenericComponent } from '../../base/generic.component';
import {
  IFormLayoutProps,
  LayoutClassesEnum,
} from '../../../definition';

export class FormLayout extends GenericComponent<IFormLayoutProps> {

  /**
   * @stable [08.05.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
      <div className={
        joinClassName(
          calc(props.className),
          LayoutClassesEnum.FORM_LAYOUT)
      }>
        <div className={LayoutClassesEnum.FORM_LAYOUT_CONTENT}>
          {
            props.topTitle && (
              <div className={LayoutClassesEnum.FORM_LAYOUT_TOP_HEADER}>
                {this.t(props.topTitle)}
              </div>
            )
          }
          {props.children}
        </div>
      </div>
    );
  }
}
