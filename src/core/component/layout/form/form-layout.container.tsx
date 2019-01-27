import * as React from 'react';

import { toClassName } from '../../../util';
import { LayoutContainer } from '../layout.container';
import { IFormLayoutProps } from './form-layout.interface';

export class FormLayoutContainer extends LayoutContainer<IFormLayoutProps> {

  /**
   * @stable [27.01.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
      <main
        className={toClassName(
          props.className,
          'rac-form-layout',
          'rac-flex',
          'rac-flex-full',
          'rac-flex-center'
        )}>
        <div className='rac-form-layout-content'>
          {
            props.topTitle && (
              <div className='rac-form-layout-top-header'>
                <div className='rac-form-layout-top-header-content'>
                  {this.t(props.topTitle)}
                </div>
              </div>
            )
          }
          {props.children}
          {props.footer}
        </div>
        {this.snackbarElement}
      </main>
    );
  }
}
