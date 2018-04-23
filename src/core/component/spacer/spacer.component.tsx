import * as React from 'react';

import { BaseComponent } from '../base';

export class Spacer extends BaseComponent<Spacer> {

  public render(): JSX.Element {
    return (
      <section className='rac-spacer'>
        &bull;
      </section>
    );
  }
}
