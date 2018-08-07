import * as React from 'react';

import { toClassName, orNull } from '../../../util';
import { LayoutContainer } from '../layout.container';
import { IFormLayoutProps } from './form-layout.interface';

export class FormLayoutContainer extends LayoutContainer<IFormLayoutProps> {

  /**
   * @stable [07.08.2018]
   * @returns {JSX.Element}
   */
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
            {
              orNull<JSX.Element>(
                props.topTitle,
                () => (
                  <div className='rac-absolute-top-position rac-form-layout-top-header'>
                    <div className='rac-form-layout-top-header-content'>
                      {this.t(props.topTitle)}
                    </div>
                  </div>
                )
              )
            }
            {
              orNull<JSX.Element>(
                props.title || props.subTitle,
                () => (
                  <section className='rac-header rac-section'>
                    {
                      orNull<JSX.Element>(
                        props.title,
                        () => <h3 className='rac-header-title'>{this.t(props.title)}</h3>
                      )
                    }
                    {
                      orNull<JSX.Element>(
                        props.subTitle,
                        () => <h5 className='rac-header-subtitle'>{this.t(props.subTitle)}</h5>
                      )
                    }
                  </section>
                )
              )
            }
            {props.children}
            {props.footer}
          </div>
          {this.snackbarTpl}
        </main>
    );
  }
}
