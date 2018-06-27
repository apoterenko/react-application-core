import * as React from 'react';

import { toClassName, orNull } from '../../../util';
import { LayoutContainer } from '../layout.container';
import { IFormLayoutProps } from './form-layout.interface';

export class FormLayoutContainer extends LayoutContainer<IFormLayoutProps> {

  public render(): JSX.Element {
    const props = this.props;
    const topHeaderMessage = this.settings.messages.topHeaderMessage;

    return (
        <main className={toClassName(
                  props.className,
                  'rac-form-layout',
                  'rac-flex',
                  'rac-flex-full',
                  'rac-flex-center'
                )}>
          <div className='rac-form-layout-content'>
            {
              orNull<JSX.Element>(
                topHeaderMessage,
                () => (
                  <div className='rac-absolute-top-position rac-form-layout-top-header'>
                    <div className='rac-form-layout-top-header-content'>
                      {this.t(topHeaderMessage)}
                    </div>
                  </div>
                )
              )
            }
            <section className='rac-header rac-section'>
              <h3 className='rac-header-title'>{this.t(props.title)}</h3>
              <h5 className='rac-header-subtitle'>{this.settings.companyName}</h5>
            </section>
            {props.children}
            {props.footer}
          </div>
          {this.snackbarTpl}
        </main>
    );
  }
}
