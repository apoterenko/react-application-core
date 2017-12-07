import * as React from 'react';

import { LayoutContainer } from '../layout.container';
import { IFormLayoutInternalProps } from './form-layout.interface';

export class FormLayoutContainer extends LayoutContainer<IFormLayoutInternalProps> {

  public render(): JSX.Element {
    const props = this.props;

    return (
        <main className='mdc-layout-grid rac-form-layout'>
          <div className='mdc-layout-grid__inner'>
            <div className='mdc-layout-grid__cell mdc-layout-grid__cell--span-12 mdc-layout-grid__cell--align-middle'>
              <div className='mdc-card'>
                <section className='mdc-card__media rac-header'>
                  <h1 className='mdc-card__title mdc-card__title--large'>
                    {this.t(props.title)}
                  </h1>
                  <h2 className='mdc-card__subtitle'>{this.settings.companyName}</h2>
                </section>
                {props.children}
                {props.footer}
              </div>
            </div>
          </div>
          {this.snackbarTpl}
        </main>
    );
  }
}
