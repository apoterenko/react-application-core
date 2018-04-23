import * as React from 'react';

import { BaseComponent } from '../base';
import { toClassName } from '../../util';

export class Footer extends BaseComponent<Footer> {

  public render(): JSX.Element {
    const props = this.props;
    return (
      <section className={toClassName(
                            this.uiFactory.cardActions,
                            'rac-footer',
                            'rac-flex',
                            'rac-flex-center'
                          )}>
        {props.children}
      </section>
    );
  }
}
