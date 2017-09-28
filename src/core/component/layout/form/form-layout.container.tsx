import * as React from 'react';

import { lazyInject, DI_TYPES } from '../../../di';

import { LayoutContainer } from '../layout.container';
import { IFormLayoutInternalProps } from './form-layout.interface';

export class FormLayoutContainer extends LayoutContainer<IFormLayoutInternalProps> {

  @lazyInject(DI_TYPES.Company) private company: string;

  public render(): JSX.Element {
    const props = this.props;

    return (
        <main className='mdc-layout-grid app-form-layout'>
          <div className='mdc-layout-grid__inner'>
            <div className='mdc-layout-grid__cell mdc-layout-grid__cell--span-12 mdc-layout-grid__cell--align-middle'>
              <div className='mdc-card'>
                <section className='mdc-card__media app-header'>
                  <h1 className='mdc-card__title mdc-card__title--large'>
                    {this.t(props.title)}
                  </h1>
                  <h2 className='mdc-card__subtitle'>{this.company}</h2>
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
