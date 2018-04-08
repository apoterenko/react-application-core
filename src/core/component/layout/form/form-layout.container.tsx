import * as React from 'react';

import { toClassName } from '../../../util';
import { LayoutContainer } from '../layout.container';
import { IFormLayoutInternalProps } from './form-layout.interface';

export class FormLayoutContainer extends LayoutContainer<IFormLayoutInternalProps> {

  public render(): JSX.Element {
    const props = this.props;

    return (
        <main className={toClassName(
                  props.className,
                  'rac-form-layout',
                  'rac-flex',
                  'rac-flex-full',
                  'rac-flex-center'
                )}>
          <div className='rac-form-layout-content'>
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
