import * as React from 'react';

import { BaseComponent } from 'core/component/base';
import { Snackbar } from 'core/component/snackbar';

import { IFormLayoutInternalProps } from './form-layout.interface';

export class FormLayout extends BaseComponent<FormLayout, IFormLayoutInternalProps, {}> {

  constructor(props: IFormLayoutInternalProps) {
    super(props);
  }

  public render(): JSX.Element {
    const props = this.props;
    const { attributes } = props;
    const message = attributes && (attributes.error || attributes.info);
    const snackbarTpl = message ? (
        <Snackbar ref='snackbar'
                  message={message}>
        </Snackbar>
    ) : null;

    return (
        <main className='mdc-layout-grid app-form-layout'>
          <div className='mdc-layout-grid__inner'>
            <div className='mdc-layout-grid__cell mdc-layout-grid__cell--span-12 mdc-layout-grid__cell--align-middle'>
              <div className='mdc-card'>
                <section className='mdc-card__media app-header'>
                  <h1 className='mdc-card__title mdc-card__title--large'>
                    {this.t(props.title)}
                  </h1>
                  <h2 className='mdc-card__subtitle'>{props.company}</h2>
                </section>
                {props.children}
                {props.footer}
              </div>
            </div>
          </div>
          {snackbarTpl}
        </main>
    );
  }
}
